import { FiMapPin, FiMaximize2, FiCompass, FiCheckCircle, FiBookmark, FiMessageCircle } from 'react-icons/fi';
import { FaBed, FaBath } from 'react-icons/fa';
import './HorizontalCard.css';

const HorizontalCard = ({ property }) => {
  return (
    <article className="horizontal-card">
      
      <div className="h-card-image-wrapper">
        <img 
          src={property.image} 
          alt={property.title} 
          className="h-card-image" 
        />
        {property.badge && <span className="h-card-badge">{property.badge}</span>}
      </div>

      <div className="h-card-content">
        
        <div className="h-card-top">
          <span className="h-card-type">{property.type}</span>
          <h3 className="h-card-title">{property.title}</h3>
          <div className="h-card-location">
            <FiMapPin size={15} />
            <span>{property.location}</span>
          </div>
        </div>

        <div className="h-card-middle">
          <span className="h-card-price">{property.price}</span>
        </div>

        <div className="h-card-bottom">
          <div className="h-card-features">
            {property.isLand ? (
              <>
                <div className="h-feature-item">
                  <FiCheckCircle />
                  <span>{property.approval}</span>
                </div>
                <div className="h-feature-item">
                  <FiCompass />
                  <span>{property.facing}</span>
                </div>
                <div className="h-feature-item">
                  <FiMaximize2 />
                  <span>{property.landArea}</span>
                </div>
              </>
            ) : (
              <>
                <div className="h-feature-item">
                  <FaBed />
                  <span>{property.beds} Beds</span>
                </div>
                <div className="h-feature-item">
                  <FaBath />
                  <span>{property.baths} Baths</span>
                </div>
                {property.sqft && (
                  <div className="h-feature-item">
                    <FiMaximize2 />
                    <span>{property.sqft} sqft</span>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="h-card-actions">
            <button className="icon-btn"><FiBookmark /></button>
            <button className="icon-btn"><FiMessageCircle /></button>
          </div>
        </div>

      </div>
    </article>
  );
};

export default HorizontalCard;