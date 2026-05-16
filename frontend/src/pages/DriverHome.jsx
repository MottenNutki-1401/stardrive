import { useState } from "react";

import {
  LoadScript,
} from "@react-google-maps/api";

import Map from "../components/Map";

import { supabase }
from "../api/api";

import "../styles/passengerhome.css";
//passsenger request
import RideRequestModal
from "../components/RideRequestModal";

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


      //ride request
      const [rideRequest,
      setRideRequest] =
      useState(null);
      //fetch request
              const fetchRideRequests =
          async () => {

          const currentUser =
            JSON.parse(
              localStorage.getItem("user")
            );

          const { data, error } =
            await supabase

              .from("ride_requests")

              .select("*")

              .eq(
                "driver_id",
                currentUser.id
              )

              .eq(
                "status",
                "pending"
              )

              .single();

          if (error) {

            console.log(error);

            return;
          }

          console.log(data);

          setRideRequest(data);
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
                <button
          onClick={fetchRideRequests}
        >
          Check Ride Requests
        </button>
        </div>

      </div>

    </LoadScript>
  );
}

export default DriverHome;