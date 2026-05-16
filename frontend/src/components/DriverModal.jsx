import "../styles/drivermodal.css";

import {

  useState,

  useEffect

} from "react";

import clockIcon
from "../assets/time.png";

/* HANDLER */
import { supabase }
from "../api/api";

function DriverModal({

  driver,

  onClose,

}) {

  if (!driver) return null;

  /* OFFER STATE */
  const [offer, setOffer] =
    useState("");

  /* DEFAULT OFFER */
  useEffect(() => {

    setOffer(
      driver.suggested_fare
    );

  }, [driver]);

  /* HIRE FUNCTION */
  const hireDriver =
    async () => {

    const currentUser =
      JSON.parse(

        localStorage
          .getItem("user")
      );

    /* GET UPDATED PASSENGER */
    const {

      data: passenger,

      error: passengerError,

    } = await supabase

      .from("users")

      .select("*")

      .eq(

        "username",

        currentUser.username
      )

      .single();

    if (passengerError) {

      console.log(
        passengerError
      );

      return;
    }

    //debug
          console.log(
        "SELECTED DRIVER:",
        driver
      );

      console.log(
        "PASSENGER:",
        passenger
      );

    /* INSERT REQUEST */
    const { error } =
      await supabase

        .from("ride_request")

        

       .insert([{

        passenger_id:
          passenger.id,

        passenger_name:
          passenger.f_name,

        passenger_pic:
          passenger.pf_pic,

        driver_id:
          driver.id,

        pickup:
          passenger.current_lat +

          "," +

          passenger.current_lng,

        destination:
          "Passenger Destination",

        offer:
              Number(offer),

            status:
              "pending",
          }]);
          console.log(error);

          if (!error) {

            alert(
              "Ride request sent!"
            );

            onClose();
          }
        };

  return (

    <div className="driver-modal">

      {/* TOP */}
      <div className="driver-top">

        <img
          src={driver.pf_pic}
          alt="driver"
        />

        <div className="driver-name">

          <div
            className=
              "online-dot"
          ></div>

          <h3>
            {driver.f_name}
          </h3>

        </div>

      </div>

      {/* INFO */}
      <div className="driver-info">

        <h2>

          <img

            src={clockIcon}

            alt="clock"

            className=
              "eta-icon"
          />

          {driver.eta_minutes}
          {" "}away

        </h2>

        <p>
          Suggested Fare:
          ₱{driver.suggested_fare}
        </p>

        <p>
          Acceptance Probability:
          {" "}
          {driver.acceptance_probability}%
        </p>

        <p>
          Acceptance Trend:
          {" "}
          {driver.status}
        </p>

      </div>

      {/* BOTTOM */}
      <div className="driver-bottom">

        <div className="offer-box">

          <span>
            Offer:
          </span>

          <input

            type="number"

            value={offer}

            onChange={(e) =>

              setOffer(
                e.target.value
              )
            }
          />

        </div>

        <button
          onClick={hireDriver}
        >
          HIRE DRIVER
        </button>

      </div>

      {/* CLOSE */}
      <button

        className="close-btn"

        onClick={onClose}
      >
        ✕
      </button>

    </div>
  );
}

export default DriverModal;