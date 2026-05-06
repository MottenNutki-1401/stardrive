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

  /* ROUTE STATE */
  const [directions, setDirections] = useState(null);

  const pickupRef = useRef(null);
  const destinationRef = useRef(null);

  const handlePlaceChanged = async () => {

    const pickupPlace = pickupRef.current.getPlace();
    const destinationPlace = destinationRef.current.getPlace();

    /* stop if both are not selected yet */
    if (!pickupPlace?.geometry || !destinationPlace?.geometry) {
      return;
    }

    /* GOOGLE DIRECTIONS SERVICE */
    const directionsService =
      new window.google.maps.DirectionsService();

    /* GET ROUTE */
    const results = await directionsService.route({
      origin: pickupPlace.geometry.location,
      destination: destinationPlace.geometry.location,
      travelMode: window.google.maps.TravelMode.DRIVING,
    });

    /* SAVE ROUTE */
    setDirections(results);

    /* DISTANCE + TIME */
    console.log(
      "Distance:",
      results.routes[0].legs[0].distance.text
    );

    console.log(
      "Duration:",
      results.routes[0].legs[0].duration.text
    );
  };

  return (

    <LoadScript
      googleMapsApiKey={API_KEY}
      libraries={["places"]}
    >

      <div className="passenger-page">

        {/* MAP */}
        <Map directions={directions} />

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