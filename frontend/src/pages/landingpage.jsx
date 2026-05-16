import logo from "../assets/logo.svg";
import "../styles/landing.css";
import Carousel from "../components/Carousel";
import { useNavigate } from "react-router-dom";
import bgVideo
from "../assets/starmp.mp4";

function LandingPage() {

    const navigate = useNavigate(); 
  return (
    <div>
              <video
          autoPlay
          loop
          muted
          playsInline
          className="bg-video"
        >

          <source
            src={bgVideo}
            type="video/mp4"
          />

        </video>
        <div className="navbar">
          <img src={logo} alt="Stardrive Logo" className="logo" />
                <div className="header-box">
              Stardrive helps passengers find the best fare while matching them with drivers who are most likely to accept the ride.
            </div>
          </div>
                   {/* MAIN SECTION */}
                <div className="main-section">

                  {/* LEFT → carousel */}
                  <Carousel />

                  {/* RIGHT → button */}
                  <button
                    className="join-btn"
                    onClick={() => navigate("/next")}
                  >
                    Join Now
                  </button>

                </div>
                  {/* yellow footer */}
                  <div className="yellow-box"></div>

      </div>
  
    
    
  );
}

export default LandingPage;