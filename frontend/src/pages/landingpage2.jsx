import "../styles/landing2.css";
import { useNavigate } from "react-router-dom";

import driverImg from "../assets/driver.png";
import passengerImg from "../assets/passenger.png";
import logo from "../assets/logo.svg";

function LandingPage2() {
  const navigate = useNavigate();

  return (
    <div className="page2">
        

      {/* TITLE */}
      <div className="title-box">
        <h1>Select what describes you</h1>
      </div>

      {/* OPTIONS */}
      <div className="options">

        {/* DRIVER */}
        <img
          src={driverImg}
          alt="driver"
          className="option-card"
          onClick={() => navigate("/driver")}
        />

        {/* PASSENGER */}
        <img
          src={passengerImg}
          alt="passenger"
          className="option-card"
          onClick={() => navigate("/passenger")}
        />
      </div>

      <div className="footer">

                {/* yellow shape */}
                <div className="yellow-box"></div>

            {/* logo */}
            <img src={logo} alt="logo" className="footer-logo" /> 
            
         </div>

    </div>
  );
}

export default LandingPage2;