import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import tripdetail from './TripData/tripdetail.json';
import categories from './TripData/categories.json';
import { useAuth } from '../../contexts/AuthContext.jsx'; // Import auth context
import { 
  ArrowLeft, 
  Calendar, 
  Mountain, 
  DollarSign, 
  Users, 
  Star, 
  MapPin, 
  Check, 
  X, 
  Clock, 
  ChevronDown,
  Bookmark,
  AlertCircle,
  Sunrise,
  Map,
  LogIn
} from 'lucide-react';
import "./Trip.css";
import "./Payment.css";

// Import components
import Seasons from './seasonal/Seasons';
import EsewaPayment from './paymentmodal/EsewaPayment';

const Trip = () => {
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeCategory, setActiveCategory] = useState('');
  const [tripCategories, setTripCategories] = useState([]);
  const [trips, setTrips] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading } = useAuth(); // Get authentication state
  
  const ChevronLeft = () => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className="category-nav-icon"
    >
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
  
  const ChevronRight = () => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className="category-nav-icon"
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  );

  useEffect(() => {
    try {
      // Set categories data
      if (categories?.tripCategories) {
        setTripCategories(categories.tripCategories);
        setActiveCategory(categories.tripCategories[0]?.id || '');
      }

      // Set trips data
      if (tripdetail?.trips) {
        setTrips(tripdetail.trips);
        
        // Check if there's a trip ID in the URL params
        const params = new URLSearchParams(location.search);
        const selectedTripId = params.get('selected');
        
        if (selectedTripId) {
          const trip = tripdetail.trips.find(t => t.id === selectedTripId);
          if (trip) {
            setSelectedTrip(trip);
          }
        }
      }
    } catch (error) {
      console.error('Error loading trip data:', error);
    }
  }, [location]);

  // Group trips by category
  const tripsByCategory = trips.reduce((acc, trip) => {
    if (!acc[trip.category]) {
      acc[trip.category] = [];
    }
    acc[trip.category].push(trip);
    return acc;
  }, {});

  // Get category details
  const getCategoryDetails = (categoryId) => {
    return tripCategories.find(cat => cat.id === categoryId);
  };

  const handleTripClick = (trip) => {
    setSelectedTrip(trip);
    // Update URL for direct access to this trip
    navigate(`?selected=${trip.id}`, { replace: true });
    window.scrollTo(0, 0);
  };

  const handleBackClick = () => {
    setSelectedTrip(null);
    navigate('', { replace: true });
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const navigateCategory = (direction) => {
    const currentIndex = tripCategories.findIndex(cat => cat.id === activeCategory);
    if (direction === 'next') {
      const nextIndex = Math.min(currentIndex + 1, tripCategories.length - 1);
      setActiveCategory(tripCategories[nextIndex]?.id);
      setSelectedCategory(tripCategories[nextIndex]?.id);
    } else {
      const prevIndex = Math.max(currentIndex - 1, 0);
      setActiveCategory(tripCategories[prevIndex]?.id);
      setSelectedCategory(tripCategories[prevIndex]?.id);
    }
  };

  const handleBookNow = (trip) => {
    if (!user) {
      // If user is not logged in, show auth modal or redirect to login
      setShowAuthModal(true);
      // Store trip info in session storage for after login
      sessionStorage.setItem('pendingBookingTrip', JSON.stringify(trip));
      return;
    }
    
    // If user is logged in, proceed with booking
    setSelectedTrip(trip);
    setShowPaymentModal(true);
  };

  const handleCancelPayment = () => {
    setShowPaymentModal(false);
  };

  const redirectToLogin = () => {
    setShowAuthModal(false);
    navigate('/login', { 
      state: { 
        returnTo: location.pathname + (selectedTrip ? `?selected=${selectedTrip.id}` : ''),
        bookingIntent: true
      } 
    });
  };

  const AuthModal = () => (
    <div className="auth-modal">
      <div className="auth-modal-content">
        <h2>Login Required</h2>
        <p>You need to be logged in to book this trip.</p>
        <div className="auth-modal-buttons">
          <button onClick={redirectToLogin} className="login-button">
            <LogIn size={16} className="icon" /> Login Now
          </button>
          <button onClick={() => setShowAuthModal(false)} className="cancel-button">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  if (!tripCategories.length || !trips.length) {
    return <div className="loading-container">Loading trips...</div>;
  }

  return (
    <div className="trip-explorer-container">
      {showPaymentModal && selectedTrip && (
        <EsewaPayment 
          amount={selectedTrip.price} 
          tripInfo={selectedTrip}
          onCancel={handleCancelPayment}
        />
      )}
      
      {showAuthModal && <AuthModal />}
      
      {selectedTrip ? (
        <div className="trip-detail-container">
          <button onClick={handleBackClick} className="back-button">
            <ArrowLeft size={18} className="icon" /> Back to Trips
          </button>
          
          <div className="trip-header">
            <img 
              src={selectedTrip.image} 
              alt={selectedTrip.title} 
              className="trip-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/800x500?text=Trip+Image';
              }}
            />
            <div className="trip-info">
              <h1>{selectedTrip.title}</h1>
              <p className="trip-description">{selectedTrip.description}</p>
              <div className="trip-meta">
                <span><Clock size={16} className="icon" /> {selectedTrip.duration}</span>
                <span><Mountain size={16} className="icon" /> {selectedTrip.difficulty}</span>
                <span><DollarSign size={16} className="icon" />  रु{selectedTrip.price}</span>
                <span><Users size={16} className="icon" /> Max {selectedTrip.participants}</span>
              </div>
              
              {/* Book Now button with authentication check */}
              {user ? (
                <button 
                  onClick={() => handleBookNow(selectedTrip)} 
                  className="book-button"
                >
                  <Bookmark size={18} className="icon" /> Book Now
                </button>
              ) : (
                <button 
                  onClick={() => handleBookNow(selectedTrip)} 
                  className="login-required-button"
                >
                  <LogIn size={18} className="icon" /> Login to Book
                </button>
              )}
            </div>
          </div>

          <div className="trip-details">
            <div className="detail-section">
              <h2><ChevronDown size={20} className="icon" /> Overview</h2>
              <p>{selectedTrip.details.overview}</p>
            </div>

            <div className="detail-section">
              <h2><Star size={20} className="icon" /> Highlights</h2>
              <ul>
                {selectedTrip.details.highlights.map((highlight, index) => (
                  <li key={index}><ChevronRight size={16} className="icon" /> {highlight}</li>
                ))}
              </ul>
            </div>

            <div className="detail-section">
              <h2><MapPin size={20} className="icon" /> Itinerary</h2>
              <ol>
                {selectedTrip.details.itinerary.map((day, index) => (
                  <li key={index}>{day}</li>
                ))}
              </ol>
            </div>

            <div className="detail-section">
              <h2><Check size={20} className="icon" /> Cost Includes</h2>
              <ul>
                {selectedTrip.details.costIncludes.map((item, index) => (
                  <li key={index}><ChevronRight size={16} className="icon" /> {item}</li>
                ))}
              </ul>
            </div>

            <div className="detail-section">
              <h2><X size={20} className="icon" /> Cost Excludes</h2>
              <ul>
                {selectedTrip.details.costExcludes.map((item, index) => (
                  <li key={index}><ChevronRight size={16} className="icon" /> {item}</li>
                ))}
              </ul>
            </div>

            <div className="detail-section">
              <h2><Calendar size={20} className="icon" /> Best Time to Visit</h2>
              <p>{selectedTrip.details.bestTime}</p>
            </div>

            <div className="detail-section">
              <h2><Mountain size={20} className="icon" /> Difficulty Level</h2>
              <p>{selectedTrip.details.difficultyLevel}</p>
            </div>

            {selectedTrip.details.altitude && (
              <div className="detail-section">
                <h2><Mountain size={20} className="icon" /> Altitude</h2>
                <p>{selectedTrip.details.altitude}</p>
              </div>
            )}

            <div className="detail-section">
              <h2><Users size={20} className="icon" /> Group Size</h2>
              <p>{selectedTrip.details.groupSize}</p>
            </div>

            <div className="detail-section">
              <h2><AlertCircle size={20} className="icon" /> FAQs</h2>
              <div className="faqs">
                {selectedTrip.details.faqs.map((faq, index) => (
                  <div key={index} className="faq-item">
                    <h3><ChevronRight size={16} className="icon" /> {faq.question}</h3>
                    <p>{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Introduction Section with Seasons Component */}
          <div className="intro-section">
            <div className="intro-content">
              <h1 className="intro-title">Adventure Trips in Nepal</h1>
              <p className="intro-description" style={{ color: 'white' }}>
                Discover Nepal's diverse landscapes and rich cultural heritage through our carefully curated trips.
              </p>
              <Seasons />
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
              disabled={tripCategories[0]?.id === activeCategory}
            >
              <ChevronLeft/>
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
              disabled={tripCategories[tripCategories.length - 1]?.id === activeCategory}
            >
              <ChevronRight/>
            </button>
          </div>

          <div className="trips-grid">
            {Object.entries(tripsByCategory).map(([categoryId, categoryTrips]) => {
              // Skip if a category is selected and it doesn't match
              if (selectedCategory && selectedCategory !== categoryId) return null;
              
              const categoryDetails = getCategoryDetails(categoryId);
              
              return (
                <div key={categoryId} className="category-section">
                  <h2>{categoryDetails?.title || categoryId}</h2>
                  <p className="category-description">{categoryDetails?.description}</p>
                  
                  <div className="trips-list">
                    {categoryTrips.map((trip) => (
                      <div key={trip.id} className="trip-card">
                        <img 
                          src={trip.image} 
                          alt={trip.title} 
                          className="trip-image"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Available';
                          }}
                        />
                        <div className="trip-content">
                          <h3>{trip.title}</h3>
                          <p className="trip-description">{trip.description}</p>
                          <div className="trip-meta">
                            <span><Clock size={16} className="icon" /> {trip.duration}</span>
                            <span><Mountain size={16} className="icon" /> {trip.difficulty}</span>
                            <span><DollarSign size={16} className="icon" />  रु{trip.price}</span>
                            <span><Users size={16} className="icon" /> {trip.participants} travelers</span>
                          </div>
                          <div className="trip-actions">
                            <button 
                              onClick={() => handleTripClick(trip)} 
                              className="detail-button"
                            >
                              <ChevronDown size={16} className="icon" /> View Details
                            </button>
                            
                            {/* Book Now button with authentication check */}
                            {user ? (
                              <button 
                                onClick={() => handleBookNow(trip)} 
                                className="book-button"
                              >
                                <Bookmark size={16} className="icon" /> Book Now
                              </button>
                            ) : (
                              <button 
                                onClick={() => handleBookNow(trip)} 
                                className="login-required-button"
                              >
                                <LogIn size={16} className="icon" /> Login to Book
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Trip;