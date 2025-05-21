import { useEffect } from "react"
import * as L from 'leaflet'
import { DrawPath, exclusionArea, isInsideExclusion } from "./drawPath"

export const ViewMap = () => {
    useEffect(() => {
        // Verifica se já existe um mapa criado nesse container e o remove
        const existingMap = L.DomUtil.get('map');
        if (existingMap != null) {
            (existingMap as any)._leaflet_id = null;
        }

        const map = L.map("map").setView([-15, -47.9], 5);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "© OpenStreetMap contributors"
        }).addTo(map);

        exclusionArea.addTo(map);

        let points: L.LatLng[] = [];
        let markers: L.Marker[] = [];
        let pathLayer: L.Polyline | null = null;

        const onClick = (e: L.LeafletMouseEvent) => {
            const latlng = e.latlng;
            if (isInsideExclusion(latlng)) {
                alert("Ponto inválido: dentro da área restrita");
                return;
            }

            if (points.length >= 2) {
                points = [];
                markers.forEach((m) => map.removeLayer(m));
                markers = [];
                if (pathLayer) map.removeLayer(pathLayer);
            }

            points.push(latlng);
            const marker = L.marker(latlng).addTo(map);
            markers.push(marker);

            if (points.length === 2) {
                pathLayer = DrawPath(map, points[0], points[1]);
            }
        }

        map.on("click", onClick);

        return () => {
            map.off("click", onClick);
            map.remove(); // desmonta o mapa corretamente
        };
    }, []);
    return (
        <div id='map' style={{ height: '100vh', width: '100vw' }}></div>
    )
}