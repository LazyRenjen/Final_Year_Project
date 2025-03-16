import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";
 
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // ✅ Fix: Added handleChange function
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.email || !formData.password) {
      setErrorMessage("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/login", formData);
      
      if (response.data.success) {
  
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/");
        window.location.reload();
      } else {
        console.log(setErrorMessage(response.data.message));
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Login failed. Please try again.";
      setErrorMessage(message);
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
        {/* ✅ Fix: Display error messages */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit" className="form-submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/signup">Signup</Link>
      </p>
    </div>
  );
};

export default Login;
