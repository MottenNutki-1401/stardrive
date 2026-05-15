import LandingPage from "./pages/landingpage";
import LandingPage2 from "./pages/landingpage2";
import PassengerHome from "./pages/PassengerHome";
import DriverHome from "./pages/DriverHome";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/next" element={<LandingPage2 />} />
        <Route path="/passenger" element={<PassengerHome/>} />
        <Route path="/driver" element={<DriverHome />} />
        <Route path="/login" element={<Login />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;