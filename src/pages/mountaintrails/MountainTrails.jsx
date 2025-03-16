import React, { useState, useEffect } from "react";
import { 
  MapPin, 
  Star, 
  Mountain, 
  Clock, 
  DollarSign, 
  Target,
  BookOpen, 
  CheckCircle 
} from "lucide-react";
import FirstTimeEverest from "./firstbanner/first_time";
import Carousel from "react-bootstrap/Carousel";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import "./MountainTrails.css";
import everestCarousel from "./everest-base-camp.jpg";
import everestDetails from "./everestmap_to_base.jpg";
import annapurnaCarousel from "./annapurnaCircuitTrek.jpg";
import annapurnaDetails from "./annapurnamap_to_base.jpg";
import langtangCarousel from "./Langtang-Trek.jpg";
import langtangDetails from "./Langtang-Trek-map.jpg";
import Footer from "../../components/Footer/footer";

const MountainTrails = () => {
  const [currentTrail, setCurrentTrail] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedTrailForBooking, setSelectedTrailForBooking] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    participants: 1
  });

  const trails = [
    {
      id: 1,
      name: "Everest Base Camp Trek",
      difficulty: "Difficult",
      cost: "$1500 - $3000",
      duration: "12-14 Days",
      description:
        "The Everest Base Camp Trek offers stunning views of Mount Everest and surrounding peaks. It passes through Sherpa villages and monasteries, providing a cultural experience.",
      location: "Nepal",
      elevation: "5,364m",
      rating: 4.8,
      bestSeason: "March-May, September-November",
      carouselImage: everestCarousel,
      detailsImage: everestDetails,
      highlights: [
        "Closest view of Mount Everest",
        "Sherpa culture exploration",
        "High-altitude mountain passes",
        "Stunning Himalayan landscapes"
      ]
    },
    {
      id: 2,
      name: "Annapurna Circuit Trek",
      difficulty: "Moderate to Difficult",
      cost: "$1000 - $2500",
      duration: "14-18 Days",
      description:
        "A diverse trail passing through lush forests, arid landscapes, and cultural villages. It offers views of the Annapurna and Dhaulagiri ranges.",
      location: "Nepal",
      elevation: "5,416m",
      rating: 4.7,
      bestSeason: "September-November, March-May",
      carouselImage: annapurnaCarousel,
      detailsImage: annapurnaDetails,
      highlights: [
        "Diverse ecological zones",
        "Hot springs at Tatopani",
        "Traditional Buddhist villages",
        "Thorong La Mountain Pass"
      ]
    },
    {
      id: 3,
      name: "Langtang Valley Trek",
      difficulty: "Moderate",
      cost: "$800 - $1500",
      duration: "7-10 Days",
      description:
        "Explore the Langtang Valley, known for its glaciers, alpine scenery, and Tamang culture. A relatively short trek with rewarding views.",
      location: "Nepal",
      elevation: "3,870m",
      rating: 4.5,
      bestSeason: "March-May, September-November",
      carouselImage: langtangCarousel,
      detailsImage: langtangDetails,
      highlights: [
        "Scenic Alpine Landscapes",
        "Rich Tamang Cultural Experience",
        "Diverse Wildlife",
        "Kyanjin Gompa Monastery"
      ]
    }
  ];

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    // Simulate booking submission
    alert(`Booking confirmed for ${selectedTrailForBooking.name}!`);
    setShowBookingModal(false);
    setBookingForm({
      name: "",
      email: "",
      phone: "",
      date: "",
      participants: 1
    });
  };

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div>
    <div className="mountain-trails-container">
      
      <div className="firsttime-carousel-container">
      <h1 className="firsttime-carousel-title">First Time Everest</h1>
      <FirstTimeEverest />
      </div>

      <h1 className="mountain-trails-title">
        <Mountain className="title-icon" /> Himalayan Trail Adventures
      </h1>

      <Carousel className="mountain-trails-carousel" interval={null}>
        {trails.map((trail) => (
          <Carousel.Item key={trail.id}>
            <img
              className="d-block w-100 mountain-trails-image"
              src={trail.carouselImage}
              alt={trail.name}
            />
            <Carousel.Caption className="mountain-trails-caption">
              <h3>{trail.name}</h3>
              <p>{trail.description}</p>
              <div className="carousel-trail-info">
                <span><MapPin size={16} /> {trail.location}</span>
                <span><Star size={16} /> {trail.rating}</span>
              </div>
              <div className="carousel-actions">
                <button
                  className="mountain-trails-details-btn"
                  onClick={() => setCurrentTrail(trail)}
                >
                  View Details
                </button>
                <button
                  className="mountain-trails-book-btn"
                  onClick={() => {
                    setSelectedTrailForBooking(trail);
                    setShowBookingModal(true);
                  }}
                >
                  Book Trek
                </button>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      {currentTrail && (
        <div className="mountain-trails-details">
          <h2 className="trail-details-title">{currentTrail.name}</h2>
          <div className="trail-details-content">
            <div className="trail-details-image-container">
              <img
                src={currentTrail.detailsImage}
                alt={currentTrail.name}
                className="trail-details-image"
              />
            </div>
            <div className="trail-details-info">
              <div className="trail-details-sections">
                <div className="trail-detail-section">
                  <h4><BookOpen /> Trek Overview</h4>
                  <p>{currentTrail.description}</p>
                </div>
                <div className="trail-detail-section">
                  <h4><CheckCircle /> Highlights</h4>
                  <ul>
                    {currentTrail.highlights.map((highlight, index) => (
                      <li key={index}>{highlight}</li>
                    ))}
                  </ul>
                </div>
                <div className="trail-detail-grid">
        <div>
      <p><Target /> <strong>Difficulty:</strong> {currentTrail.difficulty}</p>
        <p><DollarSign /> <strong>Cost:</strong> {currentTrail.cost}</p>
      </div>
        <div>
        <p><Clock /> <strong>Duration:</strong> {currentTrail.duration}</p>
       <p><MapPin /> <strong>Location:</strong> {currentTrail.location}</p>
     </div>
      </div>
                <div className="trail-footer">
                  <p>
                    <Star className="trail-details-rating-icon" /> 
                    Rating: {currentTrail.rating}/5 
                    <span className="best-season">Best Season: {currentTrail.bestSeason}</span>
                  </p>
                </div>
              </div>
              <div className="trail-details-actions">
                <button
                  className="trail-details-close-btn"
                  onClick={() => setCurrentTrail(null)}
                >
                  Close Details
                </button>
                <button 
                  className="trail-details-book-btn"
                  onClick={() => {
                    setSelectedTrailForBooking(currentTrail);
                    setShowBookingModal(true);
                  }}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      <Modal 
        show={showBookingModal} 
        onHide={() => setShowBookingModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Book {selectedTrailForBooking?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleBookingSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input 
                type="text" 
                name="name"
                value={bookingForm.name}
                onChange={handleBookingChange}
                required 
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input 
                type="email" 
                name="email"
                value={bookingForm.email}
                onChange={handleBookingChange}
                required 
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input 
                type="tel" 
                name="phone"
                value={bookingForm.phone}
                onChange={handleBookingChange}
                required 
              />
            </div>
            <div className="form-group">
              <label>Preferred Date</label>
              <input 
                type="date" 
                name="date"
                value={bookingForm.date}
                onChange={handleBookingChange}
                required 
              />
            </div>
            <div className="form-group">
              <label>Number of Participants</label>
              <input 
                type="number" 
                name="participants"
                value={bookingForm.participants}
                onChange={handleBookingChange}
                min="1"
                max="10"
                required 
              />
            </div>
            <button type="submit" className="booking-submit-btn">
              Confirm Booking
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
    <Footer />
    </div>
  );
};

export default MountainTrails;