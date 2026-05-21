import { FiCompass, FiCheckCircle, FiLayers, FiInfo, FiHome, FiZap, FiDroplet, FiTag } from 'react-icons/fi';
import './PropertySpecs.css';

const PropertySpecs = ({ property }) => {
  return (
    <div className="property-specs-card">
      <h3 className="specs-title">Property Overview</h3>
      <div className="specs-grid">
        
        <div className="specs-item">
          <FiTag className="specs-icon" />
          <div className="specs-text">
            <span className="specs-label">Purpose</span>
            <span className="specs-value text-capitalize">For {property.purpose || 'N/A'}</span>
          </div>
        </div>

        <div className="specs-item">
          <FiLayers className="specs-icon" />
          <div className="specs-text">
            <span className="specs-label">Configuration</span>
            <span className="specs-value">{property.configuration || 'Standard Specification'}</span>
          </div>
        </div>

        <div className="specs-item">
          <FiHome className="specs-icon" />
          <div className="specs-text">
            <span className="specs-label">Property Type</span>
            <span className="specs-value text-capitalize">{property.type || 'N/A'}</span>
          </div>
        </div>

        <div className="specs-item">
          <FiCompass className="specs-icon" />
          <div className="specs-text">
            <span className="specs-label">Facing Direction</span>
            <span className="specs-value">{property.facing || 'N/A'}</span>
          </div>
        </div>

        {property.isLand ? (
          <>
            <div className="specs-item">
              <FiCheckCircle className="specs-icon" />
              <div className="specs-text">
                <span className="specs-label">Approval Authority</span>
                <span className="specs-value">{property.approvalStatus || property.approval || 'N/A'}</span>
              </div>
            </div>

            <div className="specs-item">
              <FiLayers className="specs-icon" />
              <div className="specs-text">
                <span className="specs-label">Soil Type</span>
                <span className="specs-value">{property.soilType || 'N/A'}</span>
              </div>
            </div>

            <div className="specs-item">
              <FiDroplet className="specs-icon" />
              <div className="specs-text">
                <span className="specs-label">Water Provision</span>
                <span className="specs-value">{property.waterSource || 'N/A'}</span>
              </div>
            </div>

            <div className="specs-item">
              <FiZap className="specs-icon" />
              <div className="specs-text">
                <span className="specs-label">Power Infrastructure</span>
                <span className="specs-value">{property.electricity || 'N/A'}</span>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="specs-item">
              <FiCheckCircle className="specs-icon" />
              <div className="specs-text">
                <span className="specs-label">Furnishing Status</span>
                <span className="specs-value">{property.furnishing || 'N/A'}</span>
              </div>
            </div>

            <div className="specs-item">
              <FiInfo className="specs-icon" />
              <div className="specs-text">
                <span className="specs-label">Allocated Parking</span>
                <span className="specs-value">{property.parking || 'N/A'}</span>
              </div>
            </div>

            <div className="specs-item">
              <FiInfo className="specs-icon" />
              <div className="specs-text">
                <span className="specs-label">Community Rules</span>
                <span className="specs-value">{property.policies || 'N/A'}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PropertySpecs;