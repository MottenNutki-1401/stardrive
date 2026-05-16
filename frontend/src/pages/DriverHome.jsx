import {
  useState,
  useEffect
} from "react";

import {
  LoadScript,
} from "@react-google-maps/api";

import Map
from "../components/Map";

import RideRequestModal
from "../components/RideRequestModal";

import {
  supabase
} from "../api/api";

import BottomNav
from "../components/BottomNav";

import "../styles/passengerhome.css";

const libraries = ["places"];

function DriverHome() {

  const API_KEY =
    import.meta.env
    .VITE_GOOGLE_MAPS_API_KEY;

  /* PASSENGERS */
  const [
    passengers,
    setPassengers
  ] = useState([]);

  /* RIDE REQUEST */
  const [
    rideRequest,
    setRideRequest
  ] = useState(null);

  /* FETCH PASSENGERS */
  const fetchPassengers =
    async () => {

    const {
      data,
      error
    } = await supabase

      .from("users")

      .select("*")

      .eq(
        "role",
        "passenger"
      )

      .eq(
        "online",
        true
      );

    if (error) {

      console.log(error);

      return;
    }

    console.log(data);

    setPassengers(data);
  };

  /* ACCEPT RIDE */
  const acceptRide =
    async () => {

    if (!rideRequest) return;

    /* UPDATE RIDE STATUS */
    const {
      error: rideError
    } = await supabase

      .from("ride_request")

      .update({

        status:
          "accepted"
      })

      .eq(
        "id",
        rideRequest.id
      );

    console.log(rideError);

    /* CREATE CONVERSATION */
    const {
      error: convoError
    } = await supabase

      .from("conversations")

      .insert([{

        ride_request_id:
          rideRequest.id,

        passenger_id:
          rideRequest.passenger_id,

        driver_id:
          rideRequest.driver_id,

        active:
          true,
      }]);

    console.log(convoError);

    alert(
      "Ride accepted!"
    );

    setRideRequest(null);
  };

  /* REJECT RIDE */
  const rejectRide =
    async () => {

    if (!rideRequest) return;

    const {
      error
    } = await supabase

      .from("ride_request")

      .update({

        status:
          "rejected"
      })

      .eq(
        "id",
        rideRequest.id
      );

    console.log(error);

    alert(
      "Ride rejected!"
    );

    setRideRequest(null);
  };

  /* REALTIME REQUESTS */
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

            /* ONLY THIS DRIVER */
            if (

              request.driver_id ===
              currentUser.id

            ) {

              alert(
                "New Ride Request!"
              );

              console.log(
                "MATCH FOUND"
              );

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

      googleMapsApiKey={
        API_KEY
      }

      libraries={
        libraries
      }

    >

      <div className="passenger-page">

        {/* MAP */}
        <Map
          passengers={
            passengers
          }
        />

        {/* REQUEST MODAL */}
        <RideRequestModal

          request={
            rideRequest
          }

          onAccept={
            acceptRide
          }

          onReject={
            rejectRide
          }
        />

        {/* OVERLAY */}
        <div className="overlay">

          <button
            onClick={
              fetchPassengers
            }
          >
            See Nearby Passengers
          </button>

        </div>

         <BottomNav />

      </div>

    </LoadScript>
  );
}

export default DriverHome;