import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

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
            <button className="btn-secondary" onClick={toggleMenu}>Login</button>
            <button className="cta-button" onClick={() => {
              toggleMenu();
              navigate('/signup');
            }}>Sign Up</button>
          </li>
        </ul>

        <div className="desktop-only auth-buttons">
          <button className="btn-secondary">Login</button>
          <button className="cta-button" onClick={() => navigate('/signup')}>Sign Up</button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;