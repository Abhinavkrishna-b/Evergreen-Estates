import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { FiTarget, FiShield, FiTrendingUp } from 'react-icons/fi';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <>
      <Navbar />
      
      <div className="about-layout">
        
        {/* Hero Section */}
        <div className="about-hero">
          <div className="about-hero-content">
            <span className="premium-badge">Our Story</span>
            <h1>Redefining the <br/><span className="highlight-text">Real Estate</span> Experience.</h1>
            <p>Founded on the principles of transparency and excellence, Evergreen Estates is more than a marketplace - it is a trusted partner in your property journey.</p>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="stats-container">
          <div className="stat-box">
            <h2>₹500Cr+</h2>
            <p>Property Volume</p>
          </div>
          <div className="stat-box">
            <h2>1,200+</h2>
            <p>Happy Families</p>
          </div>
          <div className="stat-box">
            <h2>15+</h2>
            <p>Cities Covered</p>
          </div>
          <div className="stat-box">
            <h2>4.9/5</h2>
            <p>Client Rating</p>
          </div>
        </div>

        {/* Mission & Values Section */}
        <div className="values-section">
          <div className="values-header">
            <h2>The Evergreen Standard</h2>
            <p>We believe that buying or selling a home should be an elevated, seamless experience driven by data and human expertise.</p>
          </div>

          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon"><FiShield size={24} /></div>
              <h3>Uncompromised Trust</h3>
              <p>Every listing is verified, and every transaction is secured. We prioritize your peace of mind above all else.</p>
            </div>

            <div className="value-card">
              <div className="value-icon"><FiTarget size={24} /></div>
              <h3>Precision Matching</h3>
              <p>Using advanced market insights, we connect exactly the right buyers with the right sellers, reducing time on market.</p>
            </div>

            <div className="value-card">
              <div className="value-icon"><FiTrendingUp size={24} /></div>
              <h3>Data-Driven Growth</h3>
              <p>We equip our investors and buyers with real-time market valuations to ensure you make the most profitable decisions.</p>
            </div>
          </div>
        </div>

      </div>

      <Footer />
    </>
  );
};

export default AboutPage;