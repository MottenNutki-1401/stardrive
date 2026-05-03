import { useState } from "react";
import "../styles/carousel.css";

import slide1 from "../assets/img1.png";
import slide2 from "../assets/img2.png";
import slide3 from "../assets/img3.png";

function Carousel() {
  const slides = [slide1, slide2, slide3];

  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((current + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((current - 1 + slides.length) % slides.length);
  };

  return (
    <div className="carousel-container">

      {/* LEFT */}
      <button className="arrow left" onClick={prevSlide}>
        ◀
      </button>

      {/* IMAGE */}
      <img src={slides[current]} alt="slide" className="carousel-img" />

      {/* RIGHT */}
      <button className="arrow right" onClick={nextSlide}>
        ▶
      </button>

      {/* DOTS */}
      <div className="dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === current ? "active" : ""}`}
          ></span>
        ))}
      </div>

    </div>
  );
}

export default Carousel;