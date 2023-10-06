import { GoogleTemplate } from './container/maps/GoogleTemplate'

function App() {
  return (
    <GoogleTemplate zoom={11} center={new google.maps.LatLng(-22.88474, -43.13348)} mapId={'8e0a97af9386fef'} ></GoogleTemplate>
  )
}

export default App