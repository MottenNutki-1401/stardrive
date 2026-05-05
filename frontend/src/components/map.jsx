import { GoogleMap, LoadScript } from "@react-google-maps/api";

function Map() {
  const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const center = {
    lat: 14.8386,
    lng: 120.2842,
  };

  return (
    <LoadScript googleMapsApiKey={API_KEY}>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={center}
        zoom={13}
      />
    </LoadScript>
  );
}

export default Map;