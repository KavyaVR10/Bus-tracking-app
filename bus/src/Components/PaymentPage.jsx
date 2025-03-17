import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Components/css/PaymentPage.css";

const PaymentPage = () => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const navigate = useNavigate();

  const handlePayment = () => {
    setPaymentSuccess(true);

    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  return (
    <div className="payment-container">
      <h1 className="heading">Payment Page</h1>

      {paymentSuccess ? (
        <div className="success-message">
          <h2>✅ Payment Successful!</h2>
          <p>Redirecting to home page...</p>
        </div>
      ) : (
        <button className="pay-button" onClick={handlePayment}>
          Pay Now
        </button>
      )}
    </div>
  );
};

export default PaymentPage;
