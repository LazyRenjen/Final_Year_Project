import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { XCircle, ArrowLeft, RefreshCw } from 'lucide-react';

const PaymentFailure = () => {
  const [tripInfo, setTripInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Get booking information from session storage
    const pendingBooking = sessionStorage.getItem('pendingBooking');
    
    if (pendingBooking) {
      setTripInfo(JSON.parse(pendingBooking));
    }
    
    // Simulate API verification
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleTryAgain = () => {
    // Redirect back to the trip details page
    if (tripInfo) {
      window.location.href = `/trips?selected=${tripInfo.id}`;
    } else {
      window.location.href = '/trips';
    }
  };

  if (isLoading) {
    return (
      <div className="payment-result-container">
        <div className="loading-spinner">
          <span>Verifying payment status...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-result-container">
      <div className="payment-result-card failure">
        <XCircle size={64} className="failure-icon" />
        <h1>Payment Failed</h1>
        
        {tripInfo && (
          <div className="booking-details">
            <h2>Booking Information</h2>
            <p><strong>Trip:</strong> {tripInfo.title}</p>
            <p><strong>Amount:</strong> Rs {tripInfo.price}</p>
            <p><strong>Reference ID:</strong> {new URLSearchParams(location.search).get('referenceId')}</p>
          </div>
        )}
        
        <p className="failure-message">
          We couldn't process your payment. This could be due to insufficient funds, 
          network issues, or the payment was canceled.
        </p>
        
        <div className="action-buttons">
          <button onClick={handleTryAgain} className="try-again-btn">
            <RefreshCw size={16} /> Try Again
          </button>
          <Link to="/trips" className="back-to-trips">
            <ArrowLeft size={16} /> Back to Trips
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailure;