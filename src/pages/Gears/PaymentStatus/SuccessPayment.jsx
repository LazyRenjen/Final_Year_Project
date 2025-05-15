import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext.jsx';
import './PaymentStatus.css'; // Assuming you'll have a CSS file for styling payment status pages

const SuccessPayment = () => {
  const [purchaseInfo, setPurchaseInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    // Get the reference ID from URL params
    const params = new URLSearchParams(location.search);
    const referenceId = params.get('referenceId');
    
    if (!referenceId) {
      setError("Missing reference ID");
      setIsLoading(false);
      return;
    }

    // Get purchase information from session storage
    const pendingPurchase = sessionStorage.getItem('pendingPurchase') || 
                            localStorage.getItem('pendingPurchaseFallback');
    
    if (pendingPurchase) {
      try {
        const purchaseData = JSON.parse(pendingPurchase);
        setPurchaseInfo(purchaseData);
        
        // In a real application, you would verify the payment with your backend here
        // using the referenceId and update inventory, create order records, etc.
        
        // For demo purposes, simulating backend API call
        setTimeout(() => {
          setIsLoading(false);
          
          // Clear the pending purchase data after successful processing
          sessionStorage.removeItem('pendingPurchase');
          localStorage.removeItem('pendingPurchaseFallback');
          
          // In a real app, you might send this to your backend
          console.log("Processed successful payment:", {
            referenceId,
            productId: purchaseData.product._id,
            userId: purchaseData.user,
            amount: purchaseData.product.finalPrice,
            timestamp: new Date().toISOString()
          });
        }, 1500);
      } catch (err) {
        console.error("Error processing purchase data:", err);
        setError("Failed to process purchase information");
        setIsLoading(false);
      }
    } else {
      setError("Purchase information not found");
      setIsLoading(false);
    }
  }, [location]);

  if (isLoading) {
    return (
      <div className="payment-result-container">
        <div className="loading-spinner">
          <span>Verifying your payment...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="payment-result-container">
        <div className="payment-result-card error">
          <h1>Payment Verification Issue</h1>
          <p>{error}</p>
          <div className="action-buttons">
            <Link to="/gears" className="back-to-gears">
              <ArrowLeft size={16} /> Back to Gear Shop
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-result-container">
      <div className="payment-result-card success">
        <CheckCircle size={64} className="success-icon" />
        <h1>Payment Successful!</h1>
        
        {purchaseInfo && purchaseInfo.product && (
          <div className="purchase-details">
            <h2>Order Confirmed</h2>
            <p><strong>User ID:</strong> {user?.id}</p>
            <p><strong>Product:</strong> {purchaseInfo.product.name}</p>
            <p><strong>Original Price:</strong> रु{Number(purchaseInfo.product.originalPrice).toFixed(2)}</p>
            
            {purchaseInfo.product.discount > 0 && (
              <p><strong>Discount:</strong> {purchaseInfo.product.discount}%</p>  
            )}
            
            <p><strong>Amount Paid:</strong> रु{Number(purchaseInfo.product.finalPrice).toFixed(2)}</p>
            <p><strong>Quantity:</strong> {purchaseInfo.product.quantity}</p>
            <p><strong>Reference ID:</strong> {new URLSearchParams(location.search).get('referenceId')}</p>
            <p><strong>Order Date:</strong> {new Date().toLocaleDateString('en-US', {
              year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
            })}</p>
          </div>
        )}
        
        <p className="confirmation-message">
          Thank you for your purchase! We've sent a confirmation email with all the details.
          Your order will be processed and shipped soon.
        </p>
        
        <div className="action-buttons">
          <Link to="/gears" className="back-to-gears">
            <ArrowLeft size={16} /> Back to Gear Shop
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessPayment;