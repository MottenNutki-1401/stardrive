import { useState } from "react";

import {
  LoadScript,
} from "@react-google-maps/api";

import Map from "../components/Map";

import { supabase }
from "../api/api";

import "../styles/passengerhome.css";

function DriverHome() {

  const API_KEY =
    import.meta.env
    .VITE_GOOGLE_MAPS_API_KEY;

  /* PASSENGERS */
  const [passengers, setPassengers] =
    useState([]);

  /* FETCH PASSENGERS */
  const fetchPassengers =
    async () => {

    const { data, error } =
      await supabase

        .from("users")

        .select("*")

        .eq("role", "passenger")

        .eq("online", true);

    if (error) {

      console.log(error);

      return;
    }

    console.log(data);

    setPassengers(data);
  };

  return (

    <LoadScript
      googleMapsApiKey={API_KEY}

      libraries={["places"]}

    >

      <div className="passenger-page">

        {/* MAP */}
        <Map
          passengers={passengers}
        />

        {/* OVERLAY */}
        <div className="overlay">

          <button
            onClick={fetchPassengers}
          >
            See Nearby Passengers
          </button>

        </div>

      </div>

    </LoadScript>
  );
}

export default DriverHome;