import { GoogleMap } from './pages/GoogleMap'

function App() {
  return (
      <GoogleMap zoom={11} center={new google.maps.LatLng(40.74, -74.18)} mapId={'8e0a97af9386fef'} ></GoogleMap>
  )
}

export default App