export const Glyph = (background: string, border: string, glyph: string): google.maps.marker.PinElement => {
    return (
        new google.maps.marker.PinElement({
            scale: 1.5,
            background: background,
            borderColor: border,
            glyphColor: glyph,
            //glyph: '',
        })
    )
}