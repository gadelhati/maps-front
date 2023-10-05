import { GoogleTemplate } from './container/maps/GoogleTemplate'
import { GenericInput } from './container/input/GenericInput'
import { ChartMenu } from './container/menu/ChartMenu'

function App() {
  return (
    <>
      <GoogleTemplate zoom={11} center={new google.maps.LatLng(-22.88474, -43.13348)} mapId={'8e0a97af9386fef'} ></GoogleTemplate>
      {/* <GenericInput prefix={'R$'} suffix={".00"}></GenericInput> */}
      <ChartMenu></ChartMenu>
    </>
  )
}

export default App