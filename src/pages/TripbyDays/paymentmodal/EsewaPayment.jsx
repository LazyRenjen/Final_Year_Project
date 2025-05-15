import { useEffect } from 'react';
import CryptoJS from 'crypto-js';
import { useAuth } from '../../../contexts/AuthContext.jsx';

const EsewaPayment = ({ amount, tripInfo, onCancel }) => {
    const { user } = useAuth();

  useEffect(() => {
    // Store trip info in session storage for retrieval after payment
    sessionStorage.setItem('pendingBooking', JSON.stringify(tripInfo));
  }, [tripInfo]);

  const handlePayment = () => {
    if (!amount || amount <= 0) {
      alert("Invalid amount for payment");
      return;
    }
  
    const secretKey = "8gBm/:&EnhH.1/q"; // Replace with actual eSewa secret key
    const transactionUUID = `txn_${Date.now()}`;
    const productCode = "EPAYTEST"; // Replace with your Merchant Code
    const taxAmount = 0;
    const totalAmount = amount + taxAmount;
    const signedFieldNames = "total_amount,transaction_uuid,product_code";
  
    // Generate eSewa signature
    const signature = CryptoJS.HmacSHA256(
      `total_amount=${totalAmount},transaction_uuid=${transactionUUID},product_code=${productCode}`,
      secretKey
    ).toString(CryptoJS.enc.Base64);
  
    // Create and submit the form dynamically
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";
  
    const formData = {
      amount: amount,
      tax_amount: 0,
      total_amount: totalAmount,
      transaction_uuid: transactionUUID,
      product_code: productCode,
      product_service_charge: 0,
      product_delivery_charge: 0,
      success_url: `${window.location.origin}/payment-success?referenceId=${transactionUUID}`,
      failure_url: `${window.location.origin}/payment-failure?referenceId=${transactionUUID}`,
      signed_field_names: signedFieldNames,
      signature: signature,
    };
  
    Object.entries(formData).forEach(([key, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = String(value);
      form.appendChild(input);
    });
  
    document.body.appendChild(form);
    form.submit();
  };

  return (
    <div className="payment-modal">
      <div className="payment-modal-content">
        <h2>Confirm Payment</h2>
        <div className="payment-details">
          <p><strong>User:</strong> {user?.id}</p>  
          <p><strong>Trip:</strong> {tripInfo.title}</p>
          <p><strong>Amount:</strong>  रु{amount}</p>
          <p><strong>Payment Method:</strong> eSewa</p>

        </div>
        <div className="payment-actions">
          <button 
            onClick={handlePayment} 
            className="confirm-payment-btn"
          >
            Proceed to eSewa
          </button>
          <button 
            onClick={onCancel}
            className="cancel-payment-btn"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EsewaPayment;