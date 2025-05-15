// FailurePayment.jsx
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './PaymentStatus.css';

const FailurePayment = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Log the error information
    const queryParams = new URLSearchParams(location.search);
    const referenceId = queryParams.get('referenceId');
    const dataParam = queryParams.get('data');
    
    console.log("Payment failed for reference ID:", referenceId);
    
    if (dataParam) {
      try {
        const jsonString = atob(dataParam);
        const decodedData = JSON.parse(jsonString);
        console.log("Payment failure details:", decodedData);
      } catch (err) {
        console.error("Error decoding failure data:", err);
      }
    }
    
    // Clear the pending purchase from sessionStorage
    sessionStorage.removeItem('pendingPurchase');
  }, [location]);

  return (
    <div className="payment-status-container">
      <div className="payment-status error">
        <div className="error-icon">❌</div>
        <h2>Payment Failed</h2>
        <p>We couldn't process your payment. Your order has not been placed.</p>
        <p>This could be due to:</p>
        <ul className="error-reasons">
          <li>Insufficient funds</li>
          <li>Payment method declined</li>
          <li>Connection issues</li>
          <li>Session timeout</li>
        </ul>
        <div className="buttons">
          <Link to="/gears" className="button primary">Return to Shop</Link>
          <Link to="/" className="button secondary">Go to Homepage</Link>
        </div>
      </div>
    </div>
  );
};

export default FailurePayment;