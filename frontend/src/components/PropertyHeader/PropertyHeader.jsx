import { FiMapPin } from 'react-icons/fi';
import './PropertyHeader.css';

const PropertyHeader = ({ property }) => {
  return (
    <div className="property-header-container">
      
      {/* Left Side: Title, Location, Price */}
      <div className="header-info">
        <h1 className="property-title">{property.title}</h1>
        
        <div className="property-location">
          <FiMapPin />
          <span>{property.location}</span>
        </div>
        
        <div className="property-price-badge">
          {property.price}
        </div>
      </div>

      {/* Right Side: Agent Card */}
      {property.agent && (
        <div className="agent-card">
          <img 
            src={property.agent.image} 
            alt={property.agent.name} 
            className="agent-avatar" 
          />
          <span className="agent-name">{property.agent.name}</span>
        </div>
      )}
      
    </div>
  );
};

export default PropertyHeader;
