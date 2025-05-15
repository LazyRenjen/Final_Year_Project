// SuccessPayment.jsx
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

const SuccessPayment = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const pendingOrder = JSON.parse(sessionStorage.getItem('pendingOrder'));
        const response = await axios.post('/api/orders', {
          userId: user?.id,
          items: pendingOrder,
          totalAmount: queryParams.get('total_amount'),
          paymentData: {
            amount: queryParams.get('total_amount'),
            referenceId: queryParams.get('referenceId'),
            transactionCode: queryParams.get('transaction_code')
          }
        });
        
        sessionStorage.removeItem('pendingOrder');
        // Handle successful order creation
      } catch (error) {
        console.error('Order creation failed:', error);
        navigate('/payment-failed');
      }
    };
  
    if (user) verifyPayment();
  }, [user]);


  
  return (
    <div className="payment-container">
      <h1>Payment Successful! 🎉</h1>
      <p>Your order is being processed. You'll receive a confirmation email shortly.</p>
    </div>
  );
};

export default SuccessPayment;