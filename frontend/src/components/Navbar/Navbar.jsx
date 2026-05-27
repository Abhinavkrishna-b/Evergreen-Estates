import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX, FiBell, FiMoon, FiSun } from 'react-icons/fi';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // MOCK AUTH STATE: 
  const currentUser = true; //true - shows profile, false - login and signup

  const toggleMenu = () => setIsOpen(!isOpen);

  // Dark Mode Toggle Logic
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // This will toggle a class on the body so you can style dark mode globally later
    document.body.classList.toggle('dark-theme', !isDarkMode);
  };

  return (
    <nav className="navbar navbar-enter">
      <div className="navbar-container">
        
        {/* Logo Section */}
        <div className="navbar-logo">
          <img src="/logo.png" alt="Evergreen Estates Logo" className="logo-image" />
          <span className="logo-text">Evergreen Estates</span>
        </div>

        {/* Navigation Links (Desktop & Mobile Dropdown) */}
        <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
          <li><Link to="/" className="nav-link" onClick={toggleMenu}>Home</Link></li>
          <li><Link to="/properties" className="nav-link" onClick={toggleMenu}>Properties</Link></li>
          <li><Link to="/about" className="nav-link" onClick={toggleMenu}>About</Link></li>
          <li><Link to="/contact" className="nav-link" onClick={toggleMenu}>Contact</Link></li>
          
          {/* MOBILE ONLY: Auth State inside the hamburger menu */}
          <li className="mobile-only mobile-auth-section">
            {currentUser ? (
              <div className="mobile-user-menu">
                <Link to="/profile" className="nav-link" onClick={toggleMenu}>My Profile</Link>
                <Link to="/profile" className="nav-link" onClick={toggleMenu}>Notifications (2)</Link>
                <button className="nav-link logout-text-btn">Logout</button>
              </div>
            ) : (
              <div className="auth-buttons-mobile">
                <Link to="/login" className="btn-secondary" onClick={toggleMenu}>Login</Link>
                <Link to="/signup" className="cta-button" onClick={toggleMenu}>Sign Up</Link>
              </div>
            )}
          </li>
        </ul>

        {/* Right Side: Theme Toggle + Desktop Auth/User Menu */}
        <div className="navbar-right-controls">
          
          {/* Theme Toggle (Visible to everyone) */}
          <button className="icon-btn theme-toggle" onClick={toggleTheme} aria-label="Toggle Theme">
            {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>

          <div className="desktop-only">
            {currentUser ? (
              <div className="user-menu-group">
                {/* Notifications */}
                <div className="notification-wrapper">
                  <button className="icon-btn" aria-label="Notifications">
                    <FiBell size={20} />
                  </button>
                  <span className="notification-badge">2</span>
                </div>
                
                {/* User Avatar linking to Profile */}
                <Link to="/profile" className="user-avatar-link">
                  <img 
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" 
                    alt="User Profile" 
                    className="user-avatar"
                  />
                </Link>
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="btn-secondary">Login</Link>
                <Link to="/signup" className="cta-button">Sign Up</Link>
              </div>
            )}
          </div>

          {/* Hamburger Menu Icon */}
          <div className={`hamburger ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </div>
          
        </div>

      </div>
    </nav>
  );
};

export default Navbar;