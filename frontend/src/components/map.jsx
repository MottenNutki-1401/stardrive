import { GoogleMap, LoadScript } from "@react-google-maps/api";

function Map() {
  const center = {
    lat: 14.8386,  
    lng: 120.2842,
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyDt1rXiJxNUOHdAX6i-BKkYal4ZPI-1afA">
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={center}
        zoom={13}
      />
    </LoadScript>
  );
}

export default Map;