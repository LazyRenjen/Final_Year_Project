import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './signup.css';  

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  // ✅ Improved password validation function
  const validatePassword = (password) => {
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!strongPasswordRegex.test(password)) {
      return "Password must be at least 8 characters, include uppercase, lowercase, number, and special character.";
    }
    return null;
  };

  // ✅ New phone validation function
  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/; // Allows only 10 digits
    return phoneRegex.test(phone) ? null : "Invalid phone number. Must be 10 digits.";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // ✅ Validate password in real-time
    if (name === "password") {
      const passwordError = validatePassword(value);
      setErrorMessage(passwordError || "");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, phone, password, confirmPassword } = formData;
  
    // ✅ Validate required fields
    if (!username || !email || !phone || !password || !confirmPassword) {
      setErrorMessage("All fields are required.");
      return;
    }

    // ✅ Validate phone number
    const phoneError = validatePhone(phone);
    if (phoneError) {
      setErrorMessage(phoneError);
      return;
    }

    // ✅ Validate password
    const passwordError = validatePassword(password);
    if (passwordError) {
      setErrorMessage(passwordError);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          phone,
          password,
        }),
      });
  
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to sign up');
      }
  
      alert(data.message || 'User registered successfully!');
      setErrorMessage("");
      setFormData({ username: "", email: "", phone: "", password: "", confirmPassword: "" }); // ✅ Reset form on success
    } catch (error) {
      console.error('Signup error:', error);
      setErrorMessage(error.message || 'Error registering user');
    }
  };

  return (
    <div className="signup-form">
      <h2 className="form-title">Sign Up</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            className="form-input"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">Email</label>
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
          <label htmlFor="phone" className="form-label">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="form-input"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-input"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirm-password" className="form-label">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            name="confirmPassword"
            className="form-input"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="form-submit">Sign Up</button>
      </form>
      <p className="login-link">
        Already have an account? <Link to="/login">Login</Link>.
      </p>
    </div>
  );
};

export default SignUpForm;
