import { useState } from "react";
import Map from "../components/Map";
import "../styles/passengerhome.css";

function PassengerHome() {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");

  return (
    <div className="passenger-page">

      {/* MAP */}
      <Map />

      {/* OVERLAY UI */}
      <div className="overlay">

        <input
          type="text"
          placeholder="Add a pickup location"
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
        />

        <input
          type="text"
          placeholder="Add a destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />

        <button onClick={() => console.log(pickup, destination)}>
          Get Fare
        </button>

      </div>

    </div>
  );
}

export default PassengerHome;