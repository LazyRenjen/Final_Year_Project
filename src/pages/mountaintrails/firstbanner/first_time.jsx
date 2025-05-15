import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './first_time.css';
import basecamp from "./everest-base-camp.jpg"
import icefall from "./khumbuicefall.jpg"
import summit from "./summitpush.jpg"
const slides = [
  {
    id: 1,
    title: "Base Camp",
    description: "Starting point of the Everest journey at 5,364 meters",
    image: basecamp
  },
  {
    id: 2,
    title: "Khumbu Icefall",
    description: "Navigating through one of the most dangerous sections",
    image: icefall
  },
  {
    id: 3,
    title: "Summit Push",
    description: "The final ascent to the world's highest peak",
    image: summit
  }
];

const FirstTimeEverest = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = (index) => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  };

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  };

  useEffect(() => {
    const timer = setInterval(goToNext, 8000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <div className="carousel-container">
      <div 
        className="carousel-track"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="carousel-slide">
            <img
              src={slide.image}
              alt={slide.title}
              className="slide-image"
            />
            <div className="slide-content">
              <h2 className="slide-title">{slide.title}</h2>
              <p className="slide-description">{slide.description}</p>
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={goToPrevious}
        className="carousel-button carousel-button--prev"
        disabled={isAnimating}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button 
        onClick={goToNext}
        className="carousel-button carousel-button--next"
        disabled={isAnimating}
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="carousel-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`carousel-dot ${
              index === currentIndex ? 'carousel-dot--active' : ''
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default FirstTimeEverest;