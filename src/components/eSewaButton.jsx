import React from 'react';

const EsewaButton = ({ amount, transactionId, onSuccess, onFailure }) => {
  const initiatePayment = () => {
    const path = "https://uat.esewa.com.np/epay/main";
    const params = {
      amt: amount,
      psc: 0,
      pdc: 0,
      txAmt: 0,
      tAmt: amount,
      pid: transactionId,
      scd: process.env.REACT_APP_ESEWA_MERCHANT_ID,
      su: `${window.location.origin}/payment/success`,
      fu: `${window.location.origin}/payment/failure`
    };

    const form = document.createElement('form');
    form.setAttribute('method', 'POST');
    form.setAttribute('action', path);

    Object.keys(params).forEach(key => {
      const hiddenField = document.createElement('input');
      hiddenField.setAttribute('type', 'hidden');
      hiddenField.setAttribute('name', key);
      hiddenField.setAttribute('value', params[key]);
      form.appendChild(hiddenField);
    });

    document.body.appendChild(form);
    form.submit();
  };

  return (
    <button 
      onClick={initiatePayment}
      className="esewa-button"
    >
      <img src="/esewa-logo.png" alt="eSewa" />
      Pay with eSewa
    </button>
  );
};

export default EsewaButton;