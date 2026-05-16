import {
  useState,
  useEffect
} from "react";

import {
  LoadScript,
} from "@react-google-maps/api";

import Map from "../components/Map";

import RideRequestModal
from "../components/RideRequestModal";

import { supabase }
from "../api/api";

import "../styles/passengerhome.css";

const libraries = ["places"];

function DriverHome() {

  const API_KEY =
    import.meta.env
    .VITE_GOOGLE_MAPS_API_KEY;

  /* PASSENGERS */
  const [passengers,
    setPassengers] =
    useState([]);

  /* RIDE REQUEST */
  const [rideRequest,
    setRideRequest] =
    useState(null);

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

  /* REALTIME RIDE REQUEST */
  useEffect(() => {

    const currentUser =
      JSON.parse(
        localStorage.getItem("user")
      );

    console.log(
      "CURRENT DRIVER:",
      currentUser
    );

    const channel =
      supabase

        .channel(
          "ride-request-channel"
        )

        .on(

          "postgres_changes",

          {

            event: "INSERT",

            schema: "public",

            table: "ride_request",
          },

          (payload) => {

            console.log(
              "REALTIME PAYLOAD:",
              payload
            );

            const request =
              payload.new;

            console.log(
              "REQUEST DRIVER:",
              request.driver_id
            );

            console.log(
              "CURRENT USER:",
              currentUser.id
            );

            /* ONLY SHOW
               FOR THIS DRIVER */
            if (

              request.driver_id ===
              currentUser.id

            ) {

              alert(
                "MATCH FOUND"
              );

              console.log(
                "MATCH FOUND"
              );

              console.log(request);

              setRideRequest(
                request
              );
            }
          }
        )

        .subscribe();

    return () => {

      supabase
        .removeChannel(channel);
    };

  }, []);

  return (

    <LoadScript

      googleMapsApiKey={API_KEY}

      libraries={libraries}

    >

      <div className="passenger-page">

        {/* MAP */}
        <Map
          passengers={passengers}
        />

        {/* REQUEST MODAL */}
        <RideRequestModal

          request={rideRequest}

          onAccept={() =>

            console.log(
              "accepted"
            )
          }

          onReject={() =>

            console.log(
              "rejected"
            )
          }
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