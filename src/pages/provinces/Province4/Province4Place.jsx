import React, { useState, useEffect } from 'react';
import { X, Info } from 'lucide-react';

// Assume we'll create/import a proper data file
import placesData from './Province4.json';

const Province4Place = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    // Set places directly from the JSON file
    setPlaces(placesData.places);
  }, []);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % places.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + places.length) % places.length);
  };

  if (places.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="province-places-container">
      <h2 className="province-section-title">Explore Province 2: A Cultural Journey</h2>
      
      {/* Carousel */}
      <div className="place-carousel-wrapper">
        <div className="place-carousel-container">
          <img 
            src={places[currentSlide].image} 
            alt={places[currentSlide].name} 
            className="place-carousel-image"
          />
          
          <button 
            onClick={handlePrevSlide} 
            className="place-carousel-nav-button place-carousel-nav-button-prev"
            aria-label="Previous destination"
          >
            &#10094;
          </button>
          <button 
            onClick={handleNextSlide} 
            className="place-carousel-nav-button place-carousel-nav-button-next"
            aria-label="Next destination"
          >
            &#10095;
          </button>
          
          <div className="place-carousel-caption">
            <h3 className="place-carousel-caption-title">{places[currentSlide].name}</h3>
            <p className="place-carousel-caption-description">{places[currentSlide].description}</p>
            <button 
              onClick={() => setSelectedPlace(places[currentSlide])}
              className="place-details-button"
            >
              <Info className="place-details-button-icon" /> Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedPlace && (
        <div className="place-modal-overlay">
          <div className="place-modal-content">
            <button 
              onClick={() => setSelectedPlace(null)} 
              className="place-modal-close-button"
              aria-label="Close details"
            >
              <X className="place-modal-close-icon" />
            </button>
            
            <div className="place-modal-grid">
              <div className="place-modal-image-section">
                <img 
                  src={selectedPlace.image} 
                  alt={selectedPlace.name} 
                  className="place-modal-image"
                />
                <h2 className="place-modal-title">{selectedPlace.name}</h2>
                <p className="place-modal-description">{selectedPlace.detail}</p>
              </div>
              
              <div className="place-modal-details-section">
                {selectedPlace.description2.map((section, index) => (
                  <div key={index}>
                    <h3 className="place-modal-section-title">{section.title}</h3>
                    <ul className="place-modal-list">
                      {section.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="place-modal-list-item">
                          <h4>{detail.subtitle}</h4>
                          <p>{detail.text}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                <h3 className="place-modal-section-title">Highlights</h3>
                <ul className="place-modal-list">
                  {selectedPlace.highlights.map((highlight, index) => (
                    <li key={index} className="place-modal-list-item">{highlight}</li>
                  ))}
                </ul>
                
                <h3 className="place-modal-section-title">Best Time to Visit</h3>
                <p className="place-modal-visit-time">{selectedPlace.bestTimeToVisit}</p>
                
                <h3 className="place-modal-section-title">Travel Tips</h3>
                <ul className="place-modal-list">
                  {selectedPlace.travelTips.map((tip, index) => (
                    <li key={index} className="place-modal-list-item">{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Province4Place;