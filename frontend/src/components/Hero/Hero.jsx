import { useState } from 'react';
import { FiMapPin, FiFilter, FiSearch, FiStar,   FiTrendingUp} from 'react-icons/fi';
import './Hero.css';

const Hero = () => {
  const [filters, setFilters] = useState({
    location: '',
    propertyType: 'All',
    priceRange: 'All',
  });

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSearch = () => {
    console.log('Searching with filters:', filters);
    // TODO: Navigate to search results
  };

  return (
    <section className="hero" id="home">
      <div className="hero-content">
        {/* Left Side - Featured Property Image */}
        <div className="hero-left hero-left-enter">
          <div className="featured-property-container">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop"
              alt="Featured luxury property"
              className="featured-property-image"
            />
            <div className="hero-property-info-overlay">
                <div className="hero-property-price">₹2,50,00,000</div>
                <div className="hero-property-type">Luxury Villa</div>
                <div className="hero-property-location">
                <FiMapPin size={16} />
                Salem, Tamil Nadu
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Search & Title */}
        <div className="hero-right hero-right-enter">
          <div className="hero-text">
            <h1 className="hero-title">
              Find Your Perfect <span className="highlight">Property</span>
            </h1>
            <p className="hero-subtitle">
              Discover premium real estate opportunities with Evergreen Estates
            </p>
          </div>

          {/* Search Bar */}
          <div className="search-container">
            <div className="search-box">
              {/* Location Input */}
              <div className="search-field">
                <label className="search-label">
                  <FiMapPin className="search-icon" />
                  <span>Location</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter city or area"
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="search-input"
                />
              </div>

              {/* Property Type */}
              <div className="search-field">
                <label className="search-label">
                  <FiFilter className="search-icon" />
                  <span>Property Type</span>
                </label>
                <select
                  value={filters.propertyType}
                  onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                  className="search-input"
                >
                  <option>All</option>
                  <option>Apartment</option>
                  <option>House</option>
                  <option>Villa</option>
                  <option>Commercial</option>
                  <option>Land</option>
                </select>
              </div>

              {/* Price Range */}
              <div className="search-field">
                <label className="search-label">
                  <>
                    <FiTrendingUp className="search-icon" />
                    <span>Price Range</span>
                  </>
                </label>
                <select
                  value={filters.priceRange}
                  onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                  className="search-input"
                >
                  <option>All</option>
                  <option>Under ₹1L</option>
                  <option>₹1L - ₹50L</option>
                  <option>₹50L - ₹1Cr</option>
                  <option>₹1Cr+</option>
                </select>
              </div>

              {/* Search Button */}
              <button className="search-button" onClick={handleSearch}>
                <FiSearch size={20} />
                <span>Search</span>
              </button>
            </div>
          </div>

          {/* Secondary CTA */}
          <div className="hero-secondary-cta">
            <a href="#properties" className="browse-link">Browse all properties →</a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator">
        <span>Scroll to explore</span>
        <div className="scroll-arrow">↓</div>
      </div>
    </section>
  );
};

export default Hero;
