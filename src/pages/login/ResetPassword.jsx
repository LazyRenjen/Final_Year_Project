// file: ResetPassword.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    code: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords don't match");
      return;
    }
    
    setIsLoading(true);
    setMessage("");
    
    try {
      const response = await axios.post('/api/auth/reset-password', {
        email: formData.email,
        resetCode: formData.code,
        newPassword: formData.password
      });
      
      setIsSuccess(true);
      setMessage(response.data.message || "Password reset successful!");
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);
      
    } catch (error) {
      setIsSuccess(false);
      setMessage(error.response?.data?.message || "Failed to reset password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-form">
      <h2 className="form-title">Reset Password</h2>
      
      {isSuccess ? (
        <div className="success-message">
          <p>{message}</p>
          <p>Redirecting to login page...</p>
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
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="code" className="form-label">Reset Code</label>
            <input
              type="text"
              id="code"
              name="code"
              className="form-input"
              value={formData.code}
              onChange={handleChange}
              required
              placeholder="Enter code from your email"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password" className="form-label">New Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-input"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="form-input"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              minLength="6"
            />
          </div>
          
          {message && <p className={`message-text ${isSuccess ? 'success-message' : 'error-message'}`}>{message}</p>}
          
          <button 
            type="submit" 
            className="form-submit" 
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Reset Password"}
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

export default ResetPassword;