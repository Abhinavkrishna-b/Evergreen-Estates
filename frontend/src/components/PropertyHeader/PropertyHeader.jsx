import { FiMapPin } from 'react-icons/fi';
import './PropertyHeader.css';

const PropertyHeader = ({ property }) => {

  const seller = property.sellerId || {};

  return (
    <div className="property-header-container">
      
      {/* Left Side: Title, Location, Price */}
      <div className="header-info">
        <h1 className="property-title">{property.title}</h1>
        
        <div className="property-location">
          <FiMapPin />
          <span>{property.locality}, {property.city}</span>
        </div>
        
        <div className="property-price-badge">
          ₹{property.price?.toLocaleString('en-IN')}
        </div>
      </div>

      {/* Right Side: Agent Card */}
      {seller && (
        <div className="agent-card">
          <img 
            // Using avatarUrl with a fallback placeholder
            src={seller.avatarUrl || "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop"} 
            alt={seller.fullName || "Seller"} 
            className="agent-avatar" 
          />
          <span className="agent-name">{seller.fullName || "Verified Seller"}</span>
        </div>
      )}
      
    </div>
  );
};

export default PropertyHeader;
