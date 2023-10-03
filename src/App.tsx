// import { GenericInput } from './input/GenericInput'
import { GoogleMap } from './pages/GoogleMap'

function App() {
  return (
    <GoogleMap zoom={11} center={new google.maps.LatLng(-22.88474, -43.13348)} mapId={'8e0a97af9386fef'} ></GoogleMap>
    // <GenericInput prefix={'R$'} suffix={".00"}></GenericInput>
  )
}

export default App