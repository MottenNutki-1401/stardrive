import LandingPage from "./pages/landingpage";
import LandingPage2 from "./pages/landingpage2";
import PassengerHome from "./pages/PassengerHome";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/next" element={<LandingPage2 />} />
        <Route path="/passenger" element={<PassengerHome/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;