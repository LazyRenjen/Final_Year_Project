import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Clock, ArrowLeft, RefreshCw } from 'lucide-react';

const PaymentPending = () => {
  const [tripInfo, setTripInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Get the reference ID from URL params
    const params = new URLSearchParams(location.search);
    const referenceId = params.get('referenceId');
    
    // Get booking information from session storage
    const pendingBooking = sessionStorage.getItem('pendingBooking');
    
    if (pendingBooking) {
      setTripInfo(JSON.parse(pendingBooking));
      
      // In a real application, you would check payment status with your backend here
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } else {
      setIsLoading(false);
    }
  }, [location]);

  const handleCheckStatus = () => {
    // In a real application, this would make an API call to check the payment status
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // For demo purposes, we might randomly redirect to success or failure
      const outcome = Math.random() > 0.5 ? 'success' : 'failure';
      window.location.href = `/payment-${outcome}?referenceId=${new URLSearchParams(location.search).get('referenceId')}`;
    }, 1500);
  };

  if (isLoading) {
    return (
      <div className="payment-result-container">
        <div className="loading-spinner">
          <span>Checking payment status...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-result-container">
      <div className="payment-result-card pending">
        <Clock size={64} className="pending-icon" style={{ color: '#f59e0b' }} />
        <h1>Payment Pending</h1>
        
        {tripInfo && (
          <div className="booking-details">
            <h2>Booking Information</h2>
            <p><strong>Trip:</strong> {tripInfo.title}</p>
            <p><strong>Amount:</strong> Rs {tripInfo.price}</p>
            <p><strong>Reference ID:</strong> {new URLSearchParams(location.search).get('referenceId')}</p>
          </div>
        )}
        
        <p className="pending-message">
          Your payment is being processed. This might take a few minutes. 
          You can check the status again or return to the trip page.
        </p>
        
        <div className="action-buttons">
          <button onClick={handleCheckStatus} className="check-status-btn">
            <RefreshCw size={16} /> Check Status
          </button>
          <Link to="/trips" className="back-to-trips">
            <ArrowLeft size={16} /> Back to Trips
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentPending;