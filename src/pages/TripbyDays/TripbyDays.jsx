import React, { useState } from 'react';
import { User, Calendar, Wallet, Globe, ChevronLeft, ChevronRight, Mountain, Sunrise, Map } from 'lucide-react';
import "./TripbyDays.css";
import Seasons from './Seasons';
import Footer from '../../components/Footer/Footer';
// import Everest from "./everest-base-camp.jpg";
// import Annapurna from "./annapurnaCircuitTrek.jpg";
// import Chitwan from "./Chitwan.jpg";

const tripCategories = [
  {
    id: 'featured',
    title: 'Featured Trips',
    description: 'Our most popular and highly-rated adventures in Nepal'
  },
  {
    id: 'trekking',
    title: 'Trekking Adventures',
    description: 'Multi-day treks through the majestic Himalayas'
  },
  {
    id: 'cultural',
    title: 'Cultural Experiences',
    description: 'Immersive journeys through Nepal\'s rich heritage'
  },
  {
    id: 'wildlife',
    title: 'Wildlife Safaris',
    description: 'Explore Nepal\'s diverse wildlife and national parks'
  }
];

const trips = [
  {
    id: 1,
    category: 'featured',
    title: 'Everest Base Camp Trek',
    // image: Everest,
    duration: '14 days',
    difficulty: 'Moderate',
    price: 1999,
    participants: 14,
    description: 'Experience the stunning Himalayas and reach the base camp of the world\'s tallest mountain, Mount Everest.',
    blogLink: '/blogs/everest-base-camp-experience'
  },
  {
    id: 2,
    category: 'featured',
    title: 'Annapurna Circuit Trek',
    duration: '21 days',
    difficulty: 'Challenging',
    price: 2499,
    participants: 14,
    // image: Annapurna,
    description: 'Embark on a journey through diverse landscapes, from lush valleys to high-altitude passes, in the Annapurna region.',
    blogLink: '/blogs/annapurna-circuit-adventure'
  },
  {
    id: 1,
    category: 'wildlife',
    title: 'Chitwan National Park Safari',
    duration: '3 days',
    difficulty: 'Easy',
    price: 599,
    participants: 15,
    // image: Chitwan,
    description: 'Explore one of Nepal\'s premier wildlife sanctuaries and spot exotic animals like the one-horned rhinoceros.',
    blogLink: '/blogs/chitwan-wildlife-safari'
  },
];

const TripExplorer = () => {
  const [activeTrip, setActiveTrip] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState('featured');

  const handleTripDetails = (trip) => {
    setActiveTrip(trip);
    setShowDetailsModal(true);
  };

  const handleBookTrip = (trip) => {
    setActiveTrip(trip);
    setShowBookingModal(true);
  };

  const handleCloseModal = () => {
    setShowDetailsModal(false);
    setShowBookingModal(false);
    setActiveTrip(null);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const formData = {
      trip: activeTrip.title,
      name: e.target.name.value,
      email: e.target.email.value,
      date: e.target.date.value
    };
    console.log('Booking submitted:', formData);
    handleCloseModal();
  };

  const navigateCategory = (direction) => {
    const currentIndex = tripCategories.findIndex(cat => cat.id === activeCategory);
    if (direction === 'next' && currentIndex < tripCategories.length - 1) {
      setActiveCategory(tripCategories[currentIndex + 1].id);
    } else if (direction === 'prev' && currentIndex > 0) {
      setActiveCategory(tripCategories[currentIndex - 1].id);
    }
  };

  const filteredTrips = trips.filter(trip => trip.category === activeCategory);

  return (
  <div>
    <div className="trip-explorer-container">
      {/* Introduction Section */}
      <div className="intro-section">
        <div className="intro-content">
          <h1 className="intro-title">Trips by Days in Nepal</h1>
          <p className="intro-description">
            Discover Nepal's diverse landscapes and rich cultural heritage through our carefully curated trips. Whether you're looking for a short cultural experience or an extended trek in the Himalayas, we have the perfect adventure for every timeframe.
          </p>

        
      {/* Trekking Season */}
      <div>
      <Seasons /> {/* Use the imported component */}
    </div>


          {/* Category Navigation */}
          <div className="intro-features">
            <div className="feature-item">
              <Mountain className="feature-icon" />
              <span>World-class treks</span>
            </div>
            <div className="feature-item">
              <Sunrise className="feature-icon" />
              <span>Cultural immersion</span>
            </div>
            <div className="feature-item">
              <Map className="feature-icon" />
              <span>Expert guides</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="category-nav">
        <button 
          onClick={() => navigateCategory('prev')}
          className="category-nav-btn"
          disabled={tripCategories[0].id === activeCategory}
        >
          <ChevronLeft className="category-nav-icon" />
        </button>
        <div className="category-info">
          <h2 className="category-title">
            {tripCategories.find(cat => cat.id === activeCategory)?.title}
          </h2>
          <p className="category-description">
            {tripCategories.find(cat => cat.id === activeCategory)?.description}
          </p>
        </div>
        <button 
          onClick={() => navigateCategory('next')}
          className="category-nav-btn"
          disabled={tripCategories[tripCategories.length - 1].id === activeCategory}
        >
          <ChevronRight className="category-nav-icon" />
        </button>
      </div>

      {/* Trip Grid */}
      {/* Trip Grid */}
<div className="trip-grid">
  {filteredTrips.map((trip) => (
    <div key={trip.id} className="trip-card">
      
      {/* Trip Image */}
      <div className="trip-image">
        <img 
          src={trip.image} 
          alt={trip.title} 
          className="trip-image-element" 
        />
      </div>

      {/* Trip Info */}
      <div className="trip-info">
        <h3 className="trip-title">{trip.title}</h3>
        
        {/* Trip Details */}
        <div className="trip-details">
          <div className="trip-detail">
            <Calendar className="trip-detail-icon" />
            <span>{trip.duration}</span>
          </div>
          <div className="trip-detail">
            <Wallet className="trip-detail-icon" />
            <span>${trip.price}</span>
          </div>
          <div className="trip-detail">
            <User className="trip-detail-icon" />
            <span>{trip.participants} travelers</span>
          </div>
        </div>

        {/* Trip Actions */}
        <div className="trip-actions">
          <button 
            onClick={() => handleTripDetails(trip)}
            className="btn btn-details"
          >
            Details
          </button>
          <button 
            onClick={() => handleBookTrip(trip)}
            className="btn btn-book"
          >
            Book
          </button>
        </div>
      </div>

    </div>
  ))}
</div>

      {/* Modals */}
      {showDetailsModal && activeTrip && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close-btn" onClick={handleCloseModal}>&times;</button>
            <h2 className="modal-title">{activeTrip.title}</h2>
            <p className="modal-description">{activeTrip.description}</p>
            <div className="modal-info">
              <div className="modal-info-item">
                <Calendar className="modal-info-icon" />
                <span>Duration: {activeTrip.duration}</span>
              </div>
              <div className="modal-info-item">
                <Globe className="modal-info-icon" />
                <span>Difficulty: {activeTrip.difficulty}</span>
              </div>
              <div className="modal-info-item">
                <Wallet className="modal-info-icon" />
                <span>Cost: ${activeTrip.price}</span>
              </div>
              <div className="modal-info-item">
                <User className="modal-info-icon" />
                <span>Group size: {activeTrip.participants}</span>
              </div>
            </div>
            <a 
              href={activeTrip.blogLink}
              className="modal-blog-link"
            >
              Read Traveler Experiences
            </a>
          </div>
        </div>
      )}

      {showBookingModal && activeTrip && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close-btn" onClick={handleCloseModal}>&times;</button>
            <h2 className="modal-title">Book {activeTrip.title}</h2>
            <form onSubmit={handleBookingSubmit} className="booking-form">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input 
                  type="text" 
                  name="name" 
                  required 
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  required 
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Preferred Travel Date</label>
                <input 
                  type="date" 
                  name="date" 
                  required 
                  className="form-input"
                />
              </div>
              <button 
                type="submit"
                className="btn btn-submit"
              >
                Confirm Booking
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  <Footer />
  </div>
  );
};

export default TripExplorer;