// EsewaIntegration.jsx
import React, { useEffect } from 'react';
import CryptoJS from 'crypto-js';
import "./EsewaPayment.css";
import { useAuth } from '../../../contexts/AuthContext.jsx';

const EsewaIntegration = ({ amount, onClose, product }) => {
  const { user } = useAuth();
  
  const initiatePayment = () => {
    if (!amount || amount <= 0) {
      alert("Invalid amount for payment");
      return;
    }

    // Prepare complete product data for session storage
    const paymentData = {
      product: {
        ...product,
        finalPrice: amount,
        originalPrice: product.price,
        quantity: 1
      },
      user: user?.id,
      timestamp: new Date().toISOString()
    };

    // Save to sessionStorage and localStorage as fallback
    try {
      sessionStorage.setItem('pendingPurchase', JSON.stringify(paymentData));
      localStorage.setItem('pendingPurchaseFallback', JSON.stringify(paymentData));
      console.log("Payment data saved:", paymentData);
    } catch (e) {
      console.error("Storage error:", e);
      alert("Failed to prepare payment data");
      return;
    }

    const secretKey = "8gBm/:&EnhH.1/q";
    const transactionUUID = `txn_${Date.now()}_${user?.id || 'guest'}`;
    const productCode = "EPAYTEST";
    const taxAmount = 0;
    const totalAmount = amount + taxAmount;
    const signedFieldNames = "total_amount,transaction_uuid,product_code";

    const signatureData = `total_amount=${totalAmount},transaction_uuid=${transactionUUID},product_code=${productCode}`;
    const signature = CryptoJS.HmacSHA256(signatureData, secretKey)
                          .toString(CryptoJS.enc.Base64);

    const formData = {
      amount: amount,
      tax_amount: taxAmount,
      total_amount: totalAmount,
      transaction_uuid: transactionUUID,
      product_code: productCode,
      product_service_charge: 0,
      product_delivery_charge: 0,
      success_url: `${window.location.origin}/gears/payments/SuccessPayment?referenceId=${transactionUUID}`,
      failure_url: `${window.location.origin}/gears/payments/FailurePayment?referenceId=${transactionUUID}`,
      signed_field_names: signedFieldNames,
      signature: signature,
    };

    console.log("Submitting to eSewa with:", formData);

    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

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
    <div className="esewa-payment-modal">
      <div className="esewa-payment-container">
        <h3>Complete Your Purchase</h3>
        <p><strong>User:</strong> {user?.id}</p>
        <p>Total Amount: रु{amount.toFixed(2)}</p>
        <p>You will be redirected to eSewa payment gateway.</p>
        
        <div className="payment-actions">
          <button className="proceed-payment" onClick={initiatePayment}>
            Proceed to Payment
          </button>
          <button className="cancel-payment" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EsewaIntegration;