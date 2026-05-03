import logo from "../assets/logo.svg";
import "../styles/landing.css";
import Carousel from "../components/Carousel";

function LandingPage() {
  return (
    <div>
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
                    onClick={() => navigate("/home")}
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