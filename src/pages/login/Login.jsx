import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// This import is missing at the top of Login.js
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock login logic
    const isAuthenticated = formData.email === "user@example.com" && formData.password === "password";

    if (isAuthenticated) {
      console.log("Login Successful");
      navigate("/dashboard"); // Navigate to dashboard or any protected route
    } else {
      console.log("Invalid credentials");
      alert("Invalid email or password!");
    }
  };

  return (
    <div className="login-form">
      <h2 className="form-title">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="login-email" className="form-label">Email</label>
          <input
            type="email"
            id="login-email"
            name="email"
            className="form-input"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="login-password" className="form-label">Password</label>
          <input
            type="password"
            id="login-password"
            name="password"
            className="form-input"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="form-submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/signup">Signup</Link>
      </p>
    </div>
  );
};

export default Login;
