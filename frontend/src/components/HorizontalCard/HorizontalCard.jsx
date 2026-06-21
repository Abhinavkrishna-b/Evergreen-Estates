import { FiMapPin, FiMaximize2, FiCompass, FiCheckCircle, FiBookmark, FiMessageSquare } from 'react-icons/fi';
import { FaBed, FaBath } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './HorizontalCard.css';

const HorizontalCard = ({ property, customActions }) => {
  const navigate = useNavigate();

  // Determine if the property is a plot of land based on the backend enum
  const isLand = property.propertyType === 'Land' || property.propertyType === 'Agriculture Land';

  return (
    <article 
      className="horizontal-card"
      // Updated to use MongoDB's _id
      onClick={() => navigate(`/properties/${property._id}`)}
      style={{ cursor: 'pointer' }}
    >
      
      <div className="h-card-image-wrapper">
        <img 
          // Updated to coverImage with a fallback
          src={property.coverImage || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&fit=crop"} 
          alt={property.title} 
          className="h-card-image" 
        />
        {property.badge && <span className="h-card-badge">{property.badge}</span>}
      </div>

      <div className="h-card-content">
        
        <div className="h-card-top">
          {/* Updated to propertyType */}
          <span className="h-card-type">{property.propertyType}</span>
          <h3 className="h-card-title">{property.title}</h3>
          <div className="h-card-location">
            <FiMapPin size={15} />
            {/* Combined locality and city from the backend */}
            <span>{property.locality}, {property.city}</span>
          </div>
        </div>

        <div className="h-card-middle">
          {/* Added ₹ symbol and Indian comma formatting to the raw number */}
          <span className="h-card-price">₹{property.price?.toLocaleString('en-IN')}</span>
        </div>

        <div className="h-card-bottom">
          <div className="h-card-features">
            {isLand ? (
              <>
                {property.approvalAuthority && (
                  <div className="h-feature-item">
                    <FiCheckCircle />
                    <span>{property.approvalAuthority}</span>
                  </div>
                )}
                {property.facingDirection && (
                  <div className="h-feature-item">
                    <FiCompass />
                    <span>{property.facingDirection}</span>
                  </div>
                )}
                {property.area && (
                  <div className="h-feature-item">
                    <FiMaximize2 />
                    <span>{property.area}</span>
                  </div>
                )}
              </>
            ) : (
              <>
                {property.beds && (
                  <div className="h-feature-item">
                    <FaBed />
                    <span>{property.beds} Beds</span>
                  </div>
                )}
                {property.baths && (
                  <div className="h-feature-item">
                    <FaBath />
                    <span>{property.baths} Baths</span>
                  </div>
                )}
                {property.area && (
                  <div className="h-feature-item">
                    <FiMaximize2 />
                    <span>{property.area}</span>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="h-card-actions">
            {customActions ? (
              customActions
            ) : (
              <>
                <button 
                  className="icon-btn" 
                  onClick={(e) => { e.stopPropagation(); /* Add message logic here later */ }}
                >
                  <FiMessageSquare />
                </button>
                <button 
                  className="icon-btn" 
                  onClick={(e) => { e.stopPropagation(); /* Add bookmark logic here later */ }}
                >
                  <FiBookmark />
                </button>
              </>
            )}
          </div>
        </div>

      </div>
    </article>
  );
};

export default HorizontalCard;