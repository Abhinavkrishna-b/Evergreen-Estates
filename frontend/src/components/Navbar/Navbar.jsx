import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar navbar-enter">
      <div className="navbar-container">
        
        {/* Logo Section */}
        <div className="navbar-logo">
          <img
            src="/logo.png"
            alt="Evergreen Estates Logo"
            className="logo-image"
          />
          <span className="logo-text">Evergreen Estates</span>
        </div>

        {/* Hamburger Menu */}
        <div 
          className={`hamburger ${isOpen ? 'active' : ''}`}
          onClick={toggleMenu}
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </div>

        {/* Navigation Links & Mobile Auth Buttons */}
        <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
          <li>
            <Link to="/" 
              className="nav-link" 
              onClick={toggleMenu}>
              Home
            </Link>
          </li>

          <li>
            <Link to="/properties"
              className="nav-link"
              onClick={toggleMenu}>
              Properties
            </Link>
          </li>
          <li><a href="#about" className="nav-link" onClick={toggleMenu}>About</a></li>
          <li><a href="#contact" className="nav-link" onClick={toggleMenu}>Contact</a></li>
          
          <li className="mobile-only auth-buttons-mobile">

            <Link to="/login" className="btn-secondary">
              Login
            </Link>
            <Link to="/signup" className="cta-button">
              Sign Up
            </Link>

          </li>
        </ul>

        <div className="desktop-only auth-buttons">

          <Link to="/login" className="btn-secondary">
            Login
          </Link>
          <Link to="/signup" className="cta-button">
            Sign Up
          </Link>

        </div>

      </div>
    </nav>
  );
};

export default Navbar;