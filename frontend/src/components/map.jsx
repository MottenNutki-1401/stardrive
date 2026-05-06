import { GoogleMap } from "@react-google-maps/api";
import mapTheme from "../styles/mapTheme";

function Map() {

  const center = {
    lat: 14.8386,
    lng: 120.2842,
  };

  return (
    <GoogleMap
      mapContainerStyle={{
        width: "100%",
        height: "100%",
      }}
      center={center}
      zoom={13}

      options={{
      mapId: "450cede40856a4b2d67c950a",
  }}
    />
  );
}

export default Map;