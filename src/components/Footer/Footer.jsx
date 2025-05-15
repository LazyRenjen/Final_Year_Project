import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Facebook,
  Instagram,
  X as Twitter,
  MapPin,
  Mail,
} from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Define link routes with permission requirements
  const linkRoutes = [
    { label: 'Home', path: '/' },
    { label: 'Provinces', path: '/provinces' },
    { label: 'Gears', path: '/gears' },
    { label: 'Trip By Days', path: '/trip-by-days' },
    { label: 'Travel Notices', path: '/travel' },
    { label: 'Community Hub', path: '/community', requiresAuth: true },
    { label: 'Sustainability', path: '/SustainabilityPlan', requiresAuth: true },
    { label: 'Admin Dashboard', path: '/admin', requiresAdmin: true },
  ];

  // Filter links based on user permissions
  const filteredLinks = linkRoutes.filter(link => {
    if (link.requiresAdmin && (!user || !user.isAdmin)) return false;
    if (link.requiresAuth && !user) return false;
    return true;
  });

  // Split into two columns
  const midpoint = Math.ceil(filteredLinks.length / 2);
  const firstColumnLinks = filteredLinks.slice(0, midpoint);
  const secondColumnLinks = filteredLinks.slice(midpoint);

  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Top Section: About + Quick Links + Contact + Social */}
        <div className="footer-main">
          {/* Column 1: About */}
          <section className="footer-section about-section">
            <h3 className="footer-heading">About Us</h3>
            <p className="footer-text">
              At Nepal Travel Guide, we are dedicated to providing you with
              exceptional travel experiences. Our expert team is here to assist
              you in exploring the beauty of Nepal and crafting unforgettable
              adventures.
            </p>
            <button className="btn btn-primary">Learn More</button>
          </section>

          {/* Column 2: Quick Links */}
          <section className="footer-section links-section">
            <h3 className="footer-heading">Quick Links</h3>
            <div className="links-columns">
              <ul className="footer-links">
                {firstColumnLinks.map((link) => (
                  <li key={link.label}>
                    <Link to={link.path} className="footer-link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="footer-links">
                {secondColumnLinks.map((link) => (
                  <li key={link.label}>
                    <Link to={link.path} className="footer-link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Column 3: Contact */}
          <section className="footer-section contact-section">
            <h3 className="footer-heading">Contact Us</h3>
            <p className="footer-text">
              If you have any questions or need assistance, feel free to reach
              out to us. We're here to help!
            </p>
            <div className="contact-info">
              <div className="contact-item">
                <MapPin className="contact-icon" size={16} />
                <span>Kathmandu, Nepal</span>
              </div>
              <a
                href="mailto:info@thenepaltravelguide.com"
                className="contact-item contact-email"
              >
                <Mail className="contact-icon" size={16} />
                <span>info@thenepaltravelguide.com</span>
              </a>
            </div>
            <button className="btn btn-secondary">Contact Us</button>
          </section>

          {/* Column 4: Social */}
          <section className="footer-section social-section">
            <h3 className="footer-heading">Follow Us</h3>
            <div className="social-icons">
              <a
                href="https://www.facebook.com"
                className="social-icon"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://www.instagram.com"
                className="social-icon"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://twitter.com"
                className="social-icon"
                aria-label="X (Twitter)"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter size={20} />
              </a>
            </div>
          </section>
        </div>

        {/* Bottom Section: Legal Links */}
        <div className="footer-bottom">
          <p className="copyright">
            © {new Date().getFullYear()} Nepal Travel Guide. All rights reserved.
          </p>
          <div className="footer-bottom-links">
            <Link to="/privacy-policy" className="footer-bottom-link">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="footer-bottom-link">
              Terms of Service
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;