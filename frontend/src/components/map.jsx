import {
  GoogleMap,
  DirectionsRenderer,
} from "@react-google-maps/api";

import "../styles/mapTheme.js";
import "../styles/map.css";


function Map({ directions }) {

  const center = {
    lat: 14.8386,
    lng: 120.2842,
  };

  return (
    <GoogleMap
      mapContainerClassName="google-map"
      center={center}
      zoom={13}
    >

      {/* DRAW ROUTE */}
      {directions && (
        <DirectionsRenderer
          directions={directions}
          options={{
            polylineOptions: {
              strokeColor: "#8B5CF6",
              strokeWeight: 6,
            },
            suppressMarkers: false,
          }}
        />
      )}

    </GoogleMap>
  );
}

export default Map;