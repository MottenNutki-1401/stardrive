import {
  GoogleMap,
  DirectionsRenderer,
  OverlayView,
} from "@react-google-maps/api";

import "../styles/mapTheme.js";
import "../styles/map.css";

function Map({
  directions,
  drivers,
  setSelectedDriver,
}) {

  console.log(drivers);

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

            {/* DRIVER MARKERS */}
          {drivers.map((driver) => (

              <OverlayView
                key={driver.id}
                position={{
                  lat: parseFloat(driver.current_lat),
                  lng: parseFloat(driver.current_lng),
                }}

                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
              >

            <div className="driver-marker"
             onClick={() => setSelectedDriver(driver)}
            >

              <img
                src={driver.pf_pic}
                alt="driver"
              />

              <div className="online-dot"></div>

            </div>

          </OverlayView>

        ))}

    </GoogleMap>
  );
}

export default Map;