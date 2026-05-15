import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { loginUser } from "../api/api";

import carRide from "../assets/car.png";

import "../styles/login.css";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const handleLogin = async () => {

    const user =
    await loginUser(

        email,
        password
    );

    if (user.error) {

      alert(user.error);

      return;
    }

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    console.log(user);

    if (user.role === "driver") {

      navigate("/driver");

    } else {

      navigate("/passenger");
    }
  };

  return (

    <div className="login-page">

      <div className="login-container">

        {/* LEFT */}
        <div className="login-left">

          <div className="login-card">

                <input
                type="email"
                placeholder="email"

                value={email}

                onChange={(e) =>
                    setEmail(e.target.value)
                }
                />

            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

            <button onClick={handleLogin}>
              Let's GO!
            </button>

          </div>

          <div className="signup-box">

            <p>
              dont have an account?
            </p>

            <Link to="/signup">
              Sign-up here
            </Link>

          </div>

        </div>

        {/* RIGHT */}
        <div className="login-right">

          <h1>
            Every ride
            <br />
            tells a story.
            <br />
            Make
            <br />
            every mile
            <br />
            yours!
          </h1>

          <img
            src={carRide}
            alt="ride"
          />

        </div>

      </div>

    </div>
  );
}

export default Login;