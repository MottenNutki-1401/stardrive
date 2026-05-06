import { useState, useRef } from "react";

import {
  Autocomplete,
  LoadScript,
} from "@react-google-maps/api";

import Map from "../components/Map";

import "../styles/passengerhome.css";

function PassengerHome() {

  const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");

  const pickupRef = useRef(null);
  const destinationRef = useRef(null);

  const handlePlaceChanged = () => {

    const pickupPlace = pickupRef.current.getPlace();
    const destinationPlace = destinationRef.current.getPlace();

    if (pickupPlace?.geometry) {
      console.log(
        "Pickup:",
        pickupPlace.geometry.location.lat(),
        pickupPlace.geometry.location.lng()
      );
    }

    if (destinationPlace?.geometry) {
      console.log(
        "Destination:",
        destinationPlace.geometry.location.lat(),
        destinationPlace.geometry.location.lng()
      );
    }
  };

  return (

    <LoadScript
      googleMapsApiKey={API_KEY}
      libraries={["places"]}
    >

      <div className="passenger-page">

        {/* MAP */}
        <Map />

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

          <button
            onClick={() => console.log(pickup, destination)}
          >
            Get Fare
          </button>

        </div>

      </div>

    </LoadScript>
  );
}

export default PassengerHome;