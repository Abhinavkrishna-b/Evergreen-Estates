import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiBell, FiMoon, FiSun } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { user, isLoggedIn, isSeller, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-theme', !isDarkMode);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsOpen(false);
  };

  const profileLink = isSeller ? '/seller-profile' : '/profile';

  return (
    <nav className="navbar navbar-enter">
      <div className="navbar-container">

        {/* Logo */}
        <div className="navbar-logo">
          <img src="/logo.png" alt="Evergreen Estates Logo" className="logo-image" />
          <span className="logo-text">Evergreen Estates</span>
        </div>

        {/* Nav Links */}
        <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
          <li><Link to="/" className="nav-link" onClick={toggleMenu}>Home</Link></li>
          <li><Link to="/properties" className="nav-link" onClick={toggleMenu}>Properties</Link></li>
          <li><Link to="/about" className="nav-link" onClick={toggleMenu}>About</Link></li>
          <li><Link to="/contact" className="nav-link" onClick={toggleMenu}>Contact</Link></li>

          {/* Mobile auth */}
          <li className="mobile-only mobile-auth-section">
            {isLoggedIn ? (
              <div className="mobile-user-menu">
                <Link to={profileLink} className="nav-link" onClick={toggleMenu}>My Profile</Link>
                <button className="nav-link logout-text-btn" onClick={handleLogout}>Logout</button>
              </div>
            ) : (
              <div className="auth-buttons-mobile">
                <Link to="/login" className="btn-secondary" onClick={toggleMenu}>Login</Link>
                <Link to="/signup" className="cta-button" onClick={toggleMenu}>Sign Up</Link>
              </div>
            )}
          </li>
        </ul>

        {/* Right controls */}
        <div className="navbar-right-controls">

          <button className="icon-btn theme-toggle" onClick={toggleTheme} aria-label="Toggle Theme">
            {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>

          <div className="desktop-only">
            {isLoggedIn ? (
              <div className="user-menu-group">
                <div className="notification-wrapper">
                  <button className="icon-btn" aria-label="Notifications">
                    <FiBell size={20} />
                  </button>
                  <span className="notification-badge">0</span>
                </div>
                <Link to={profileLink} className="user-avatar-link">
                  <img
                    src={user?.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"}
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

          <div className={`hamburger ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;