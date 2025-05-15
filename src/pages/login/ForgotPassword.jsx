import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/auth/forgot-password`, 
        { email },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      setIsSuccess(true);
      setMessage(response.data.message || "Reset code sent to your email!");
    } catch (error) {
      setIsSuccess(false);
      setMessage(
        error.response?.data?.message || 
        "Failed to send reset email. Please try again."
      );
      console.error("Forgot password error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-form">
      <h2 className="form-title">Forgot Password</h2>
      {isSuccess ? (
        <div className="success-message">
          <p>{message}</p>
          <p>Please check your email for the verification code.</p>
          <Link to="/reset-password" className="form-submit link-button">
            Enter Reset Code
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your registered email"
            />
          </div>
          
          {message && (
            <p className={`message-text ${isSuccess ? 'success-message' : 'error-message'}`}>
              {message}
            </p>
          )}
          
          <button 
            type="submit" 
            className="form-submit" 
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Reset Code"}
          </button>

          <div className="form-links">
            <Link to="/login" className="back-to-login">
              Back to Login
            </Link>
          </div>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;