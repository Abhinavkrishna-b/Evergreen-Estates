import {
  FiMapPin,
  FiMaximize2,
  FiArrowRight,
  FiCompass,
  FiCheckCircle,
} from "react-icons/fi";

import { FaBed, FaBath } from "react-icons/fa";

import { featuredProperties } from "../../constants/properties";
import "./FeaturedProperties.css";

const FeaturedProperties = () => {
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

          <button className="featured-view-btn">
            View All Properties
            <FiArrowRight />
          </button>
        </div>

        <div className="properties-grid">
          {featuredProperties.map((property) => (
            <article className="property-card" key={property.id}>
              <div className="property-image-wrapper">
                <img
                  src={property.image}
                  alt={property.title}
                  className="property-image"
                />

                <div className="property-overlay"></div>

                <span className="property-badge">
                  {property.badge}
                </span>

                <div className="property-price">
                  {property.price}
                </div>
              </div>

              <div className="property-content">
                <div className="property-top">
                  <span className="property-type">
                    {property.type}
                  </span>

                  <h3>{property.title}</h3>

                  <div className="property-location">
                    <FiMapPin />
                    <span>{property.location}</span>
                  </div>
                </div>

                <div className="property-features">
                    {property.isLand ? (
                      <>
                        <div className="feature-item">
                          <FiCheckCircle />
                          <span>{property.approval}</span>
                        </div>
                        
                        <div className="feature-item">
                          <FiCompass />
                          <span>{property.facing}</span>
                        </div>

                        <div className="feature-item">
                          <FiMaximize2 />
                          <span>{property.landArea}</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="feature-item">
                          <FaBed />
                          <span>{property.beds} Beds</span>
                        </div>

                        <div className="feature-item">
                          <FaBath />
                          <span>{property.baths} Baths</span>
                        </div>

                        <div className="feature-item">
                          <FiMaximize2 />
                          <span>{property.sqft} sqft</span>
                        </div>
                      </>
                    )}
                  </div>

                <button className="property-button">
                  Explore Property
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;