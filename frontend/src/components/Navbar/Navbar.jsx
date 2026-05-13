import { useState } from 'react';
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

        {/* Navigation Links & Mobile CTA */}
        <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
          <li><a href="#home" className="nav-link" onClick={toggleMenu}>Home</a></li>
          <li><a href="#properties" className="nav-link" onClick={toggleMenu}>Properties</a></li>
          <li><a href="#about" className="nav-link" onClick={toggleMenu}>About</a></li>
          <li><a href="#contact" className="nav-link" onClick={toggleMenu}>Contact</a></li>
          
          {/* This button ONLY shows inside the mobile dropdown */}
          <li className="mobile-only">
            <button className="cta-button">Get Started</button>
          </li>
        </ul>

        {/* Desktop CTA Button (Hides on mobile) */}
        <div className="desktop-only">
          <button className="cta-button">Get Started</button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;