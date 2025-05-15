// FailurePayment.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const FailurePayment = () => {
  return (
    <div className="payment-container">
      <h1>Payment Failed ❌</h1>
      <p>There was an issue processing your payment. Please try again.</p>
      <Link to="/trekking-gears" className="retry-btn">
        Try Again
      </Link>
    </div>
  );
};

export default FailurePayment;