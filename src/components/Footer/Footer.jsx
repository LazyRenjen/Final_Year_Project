import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Music } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  // Map of link names to their routes
  const linkRoutes = {
    'Home': '/',
    'Provinces': '/provinces',
    'Mountain Trails': '/mountain-trails',
    'Trekking Gears': '/trekking-gears',
    'Trip By Days': '/trip-by-days',
    'Community Hub': '/community',
    'Travel Notices': '/Travel',
    'Sustainability': '/Sustainability'
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About Us Section */}
        <div className="footer-section about-section">
          <h3 className="footer-heading">About Us</h3>
          <p className="footer-text">
            At Nepal Travel Guide, we are dedicated to providing you with exceptional travel experiences. Our expert team is here to assist you in exploring the beauty of Nepal and crafting unforgettable adventures.
          </p>
          <button className="learn-more-btn">
            Learn More
          </button>
        </div>

        {/* Quick Links Section */}
        <div className="footer-section links-section">
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-links">
            {['Home', 'Provinces', 'Mountain Trails', 'Trekking Gears', 'Trip By Days', 'Community Hub', 'Travel Notices', 'Sustainability'].map((link) => (
              <li key={link}>
                <Link to={linkRoutes[link]} className="footer-link">
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Rest of your footer component remains the same */}
        {/* Contact Us Section */}
        <div className="footer-section contact-section">
          <h3 className="footer-heading">Contact Us</h3>
          <p className="footer-text">
            If you have any questions or need assistance, feel free to reach out to us. We're here to help!
          </p>
          <div className="contact-info">
            <p className="contact-item">
              <span className="contact-icon">📍</span> Kathmandu, Nepal
            </p>
            <a 
              href="mailto:info@thenepaltravelguide.com" 
              className="contact-item contact-email"
            >
              <span className="contact-icon">✉️</span> info@thenepaltravelguide.com
            </a>
          </div>
          <button className="contact-btn">
            Contact Us
          </button>
        </div>

        {/* Follow Us Section */}
        <div className="footer-section social-section">
          <h3 className="footer-heading">Follow Us</h3>
          <div className="social-icons">
            <a href="#www.facebook.com" className="social-icon">
              <Facebook size={20} />
            </a>
            <a href="#" className="social-icon">
              <Instagram size={20} />
            </a>
            <a href="#" className="social-icon">
              <Twitter size={20} />
            </a>
            <a href="#" className="social-icon">
              <Music size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;