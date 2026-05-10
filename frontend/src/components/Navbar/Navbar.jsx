import { useState } from 'react';
import { FiHome, FiMenu, FiX, FiSearch, FiPhone } from 'react-icons/fi';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo Section */}
        <div className="navbar-logo">
          <FiHome className="logo-icon" size={28} />
          <span className="logo-text">Evergreen Estates</span>
        </div>

        {/* Hamburger Menu */}
        <div 
          className={`hamburger ${isOpen ? 'active' : ''}`}
          onClick={toggleMenu}
        >
          {isOpen ? (
            <FiX size={24} />
          ) : (
            <FiMenu size={24} />
          )}
        </div>

        {/* Navigation Links */}
        <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
          <li><a href="#home" className="nav-link">Home</a></li>
          <li><a href="#properties" className="nav-link">Properties</a></li>
          <li><a href="#about" className="nav-link">About</a></li>
          <li><a href="#contact" className="nav-link">Contact</a></li>
        </ul>

        {/* CTA Button */}
        <button className="cta-button">Get Started</button>
      </div>
    </nav>
  );
};

export default Navbar;