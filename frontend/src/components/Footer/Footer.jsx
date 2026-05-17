import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">

        <div className="footer-grid">

          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">
              <img
                src="/logo.png"
                alt="Evergreen Estates"
                className="footer-logo-image"
              />

              <span className="footer-logo-text">
                Evergreen Estates
              </span>
            </div>

            <p className="footer-description">
              Premium villas, apartments, and land investments
              crafted for modern living across India.
            </p>
          </div>

          {/* Links */}
          <div className="footer-column">
            <h3>Company</h3>

            <a href="#home">Home</a>
            <a href="#properties">Properties</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </div>

          {/* Property */}
          <div className="footer-column">
            <h3>Properties</h3>

            <a href="#">Luxury Villas</a>
            <a href="#">Apartments</a>
            <a href="#">Farm Lands</a>
            <a href="#">Residential Plots</a>
          </div>

          {/* Contact */}
          <div className="footer-column">
            <h3>Contact</h3>

            <p>Salem, Tamil Nadu</p>
            <p>+91 95555 59999</p>
            <p>evergreenestates@gmail.com</p>
          </div>
        </div>

        {/* Bottom */}
        <div className="footer-bottom">
          <p>
            © 2026 Evergreen Estates. All rights reserved.
          </p>

          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;