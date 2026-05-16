import "../styles/bottomnav.css";

import homeIcon
from "../assets/home.svg";

import messageIcon
from "../assets/message.svg";

import profileIcon
from "../assets/profile.svg";

import {
  useNavigate
} from "react-router-dom";

function BottomNav() {

  const navigate =
    useNavigate();

  return (

    <div className="bottom-nav1">

      {/* HOME */}
      <button
        onClick={() =>
          navigate("/passengerhome")
        }
      >

        <img
          src={homeIcon}
          alt="home"
        />

      </button>

      {/* MESSAGES */}
      <button
        onClick={() =>
          navigate("/messages")
        }
      >

        <img
          src={messageIcon}
          alt="messages"
        />

      </button>

      {/* PROFILE */}
      <button
        onClick={() =>
          navigate("/profile")
        }
      >

        <img
          src={profileIcon}
          alt="profile"
        />

      </button>

    </div>
  );
}

export default BottomNav;