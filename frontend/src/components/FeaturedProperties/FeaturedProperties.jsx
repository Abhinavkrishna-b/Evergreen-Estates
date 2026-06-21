import { useState, useEffect } from 'react';
import {
  FiMapPin,
  FiMaximize2,
  FiArrowRight,
  FiCompass,
  FiCheckCircle,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { FaBed, FaBath } from "react-icons/fa";
import { getProperties } from "../../services/propertyService";
import "./FeaturedProperties.css";

const FeaturedProperties = () => {
  const navigate = useNavigate();
  
  // Backend States
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetching Logic
  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        // Get approved properties — show first 3 as featured
        const result = await getProperties({});
        setProperties(result.slice(0, 3));
      } catch (err) {
        console.error('Failed to load featured properties:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  return (
    <section className="featured-properties section" id="properties">
      <div className="container">
        <div className="featured-header">
          <div className="featured-heading">
            <span className="featured-tag">Premium Collection</span>

            <h2>
              Featured Properties Crafted For
              <span> Modern Living</span>
            </h2>

            <p>
              Explore handpicked luxury homes, apartments, and villas
              designed with elegance, comfort, and prime locations in mind.
            </p>
          </div>

          <Link to="/properties" className="featured-view-btn">
            View All Properties
            <FiArrowRight />
          </Link>
        </div>

        {loading && (
          <p style={{ textAlign: 'center', padding: '40px', width: '100%' }}>
            Loading premium properties...
          </p>
        )}

        {!loading && properties.length === 0 && (
          <p style={{ textAlign: 'center', padding: '40px', width: '100%' }}>
            No properties available yet.
          </p>
        )}

        <div className="properties-grid">
          {properties.map((property) => {
            
            const isLand = property.propertyType === 'Land' || property.propertyType === 'Agriculture Land';

            return (
              <article 
                className="property-card" 
                key={property._id} // Changed to _id
                onClick={() => navigate(`/properties/${property._id}`)} // Changed to _id
                style={{ cursor: 'pointer' }}
              >

                <div className="property-image-wrapper">
                  <img
                    // Added coverImage and fallback
                    src={property.coverImage || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&fit=crop"}
                    alt={property.title}
                    className="property-image"
                  />

                  <div className="property-overlay"></div>

                  {property.badge && (
                    <span className="property-badge">
                      {property.badge}
                    </span>
                  )}

                  <div className="property-price">
                    {/* Formatted Price */}
                    ₹{property.price?.toLocaleString('en-IN')}
                  </div>
                </div>

                <div className="property-content">
                  <div className="property-top">
                    <span className="property-type">
                      {/* Changed to propertyType */}
                      {property.propertyType}
                    </span>

                    <h3>{property.title}</h3>

                    <div className="property-location">
                      <FiMapPin />
                      {/* Changed to locality and city */}
                      <span>{property.locality}, {property.city}</span>
                    </div>
                  </div>

                  <div className="property-features">
                      {isLand ? (
                        <>
                          {property.approvalAuthority && (
                            <div className="feature-item">
                              <FiCheckCircle />
                              <span>{property.approvalAuthority}</span>
                            </div>
                          )}
                          
                          {property.facingDirection && (
                            <div className="feature-item">
                              <FiCompass />
                              <span>{property.facingDirection}</span>
                            </div>
                          )}

                          {property.area && (
                            <div className="feature-item">
                              <FiMaximize2 />
                              <span>{property.area}</span>
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          {property.beds && (
                            <div className="feature-item">
                              <FaBed />
                              <span>{property.beds} Beds</span>
                            </div>
                          )}

                          {property.baths && (
                            <div className="feature-item">
                              <FaBath />
                              <span>{property.baths} Baths</span>
                            </div>
                          )}

                          {property.area && (
                            <div className="feature-item">
                              <FiMaximize2 />
                              <span>{property.area}</span>
                            </div>
                          )}
                        </>
                      )}
                    </div>

                  <button className="property-button">
                    Explore Property
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;