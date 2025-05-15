import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext.jsx'; // Example custom hook

const PaymentSuccess = () => {
  const [tripInfo, setTripInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
 const { user } = useAuth(); // Example custom hook


  useEffect(() => {
    // Get the reference ID from URL params
    const params = new URLSearchParams(location.search);
    const referenceId = params.get('referenceId');
    
    // Get booking information from session storage
    const pendingBooking = sessionStorage.getItem('pendingBooking');
    
    if (pendingBooking) {
      setTripInfo(JSON.parse(pendingBooking));
      
      // In a real application, you would verify the payment with your backend here
      // For demo purposes, we're simulating a successful API call
      setTimeout(() => {
        setIsLoading(false);
        // Clear the pending booking from session storage
        sessionStorage.removeItem('pendingBooking');
      }, 1500);
    } else {
      setIsLoading(false);
    }
  }, [location]);

  if (isLoading) {
    return (
      <div className="payment-result-container">
        <div className="loading-spinner">
          <span>Verifying payment...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-result-container">
      <div className="payment-result-card success">
        <CheckCircle size={64} className="success-icon" />
        <h1>Payment Successful!</h1>
        
        {tripInfo && (
          <div className="booking-details">
            <h2>Booking Confirmed</h2>
            <p><strong>Trip:</strong> {tripInfo.title}</p>
            <p><strong>Amount Paid:</strong>  रु{tripInfo.price}</p>
            <p><strong>Duration:</strong> {tripInfo.duration}</p>
            <p><strong>Reference ID:</strong> {new URLSearchParams(location.search).get('referenceId')}</p>
            <p><strong>User Id:</strong> {user?.id}</p>
          </div>
        )}
        
        <p className="confirmation-message">
          Thank you for booking with us! We've sent a confirmation email with all the details.
        </p>
        
        <div className="action-buttons">
          <Link to="/trip-by-days" className="back-to-trips">
            <ArrowLeft size={16} /> Back to Trips
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;