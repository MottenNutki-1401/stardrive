import { useState, useRef } from "react";

import {
  Autocomplete,
  LoadScript,
} from "@react-google-maps/api";

import Map from "../components/Map";

import { supabase } from "../api/api";

import "../styles/passengerhome.css";

//driver click import
import DriverModal from "../components/DriverModal";

function PassengerHome() {

  const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");

  /* ROUTE STATE */
  const [directions, setDirections] = useState(null);

  /* DRIVERS */
  const [drivers, setDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] =
  useState(null);

  const pickupRef = useRef(null);
  const destinationRef = useRef(null);

  /* DRAW ROUTE */
  const handlePlaceChanged = async () => {

    const pickupPlace = pickupRef.current.getPlace();
    const destinationPlace = destinationRef.current.getPlace();

    if (!pickupPlace?.geometry || !destinationPlace?.geometry) {
      return;
    }

    const directionsService =
      new window.google.maps.DirectionsService();

    const results = await directionsService.route({
      origin: pickupPlace.geometry.location,
      destination: destinationPlace.geometry.location,
      travelMode: window.google.maps.TravelMode.DRIVING,
    });

    setDirections(results);

    console.log(
      "Distance:",
      results.routes[0].legs[0].distance.text
    );

    console.log(
      "Duration:",
      results.routes[0].legs[0].duration.text
    );
  };

  /* FETCH DRIVERS */
 const fetchDrivers = async () => {

  const pickupPlace =
    pickupRef.current.getPlace();

  if (!pickupPlace?.geometry) {
    return;
  }

  const pickupCoords = {
    lat: pickupPlace.geometry.location.lat(),
    lng: pickupPlace.geometry.location.lng(),
  };

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("role", "driver")
    .eq("online", true);

  if (error) {
    console.log(error);
    return;
  }

  const updatedDrivers = await Promise.all(

    data.map(async (driver) => {

      const directionsService =
        new window.google.maps.DirectionsService();

      const result =
        await directionsService.route({

          origin: {
            lat: parseFloat(driver.current_lat),
            lng: parseFloat(driver.current_lng),
          },

          destination: pickupCoords,

          travelMode:
            window.google.maps.TravelMode.DRIVING,
        });

      const eta =
        result.routes[0]
        .legs[0]
        .duration.text;

      return {
        ...driver,
        eta_minutes: eta,
      };
    })
  );

  console.log(updatedDrivers);

  setDrivers(updatedDrivers);
};
  return (

    <LoadScript
      googleMapsApiKey={API_KEY}
      libraries={["places"]}
    >

      <div className="passenger-page">

        {/* MAP */}
       <Map
          directions={directions}
          drivers={drivers}
          setSelectedDriver={setSelectedDriver}
        />

        <DriverModal
          driver={selectedDriver}
          onClose={() => setSelectedDriver(null)}
        />

        {/* OVERLAY */}
        <div className="overlay">

          {/* PICKUP */}
          <Autocomplete
            onLoad={(ref) => (pickupRef.current = ref)}
            onPlaceChanged={handlePlaceChanged}
          >
            <input
              type="text"
              placeholder="Add a pickup location"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
            />
          </Autocomplete>

          {/* DESTINATION */}
          <Autocomplete
            onLoad={(ref) => (destinationRef.current = ref)}
            onPlaceChanged={handlePlaceChanged}
          >
            <input
              type="text"
              placeholder="Add a destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </Autocomplete>

          <button onClick={fetchDrivers}>
            Get Nearby Drivers
          </button>

        </div>

      </div>

    </LoadScript>
  );
}

export default PassengerHome;