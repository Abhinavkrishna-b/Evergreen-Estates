import { useState } from 'react';
import { FiMapPin, FiMaximize2, FiCompass, FiCheckCircle, FiBookmark, FiMessageSquare } from 'react-icons/fi';
import { FaBed, FaBath } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { saveProperty } from '../../services/propertyService';
import './HorizontalCard.css';

const HorizontalCard = ({ property, customActions }) => {
  const navigate = useNavigate();

  // Real authentication state from your context
  const { isLoggedIn } = useAuth();

  // Backend States for the Save button
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const isLand =
    property.propertyType === 'Land' ||
    property.propertyType === 'Agriculture Land';

  // Handle Messaging
  const handleMessage = (e) => {
    e.stopPropagation();

    if (!isLoggedIn) {
      navigate('/login');
      console.log('User not logged in, redirecting...');
    } else {
      // User is logged in - Redirect to profile or messages page
      navigate('/profile');
      console.log('Redirecting to messaging/profile...');
    }
  };

  // Handle Saving Property
  const handleSave = async (e) => {
    e.stopPropagation();

    // 1. Check if logged in
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    // 2. Prevent spam clicks if already saved
    if (saved) return;

    // 3. Trigger API Call
    setSaving(true);

    try {
      await saveProperty(property._id);
      setSaved(true);
    } catch (err) {
      // If backend returns 400, it means it's already in the user's saved list
      if (err.response?.status === 400) {
        setSaved(true);
      } else {
        console.error('Save failed:', err);
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <article
      className="horizontal-card"
      onClick={() => navigate(`/properties/${property._id}`)}
      style={{ cursor: 'pointer' }}
    >
      <div className="h-card-image-wrapper">
        <img
          // Updated to coverImage with a fallback
          src={
            property.coverImage ||
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&fit=crop'
          }
          alt={property.title}
          className="h-card-image"
        />

        {property.badge && (
          <span className="h-card-badge">{property.badge}</span>
        )}
      </div>

      <div className="h-card-content">
        <div className="h-card-top">
          <span className="h-card-type">{property.propertyType}</span>

          <h3 className="h-card-title">{property.title}</h3>

          <div className="h-card-location">
            <FiMapPin size={15} />

            <span>
              {property.locality}, {property.city}
            </span>
          </div>
        </div>

        <div className="h-card-middle">
          <span className="h-card-price">
            ₹{property.price?.toLocaleString('en-IN')}
          </span>
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
                  onClick={handleMessage}
                  title="Send Message"
                >
                  <FiMessageSquare />
                </button>

                <button
                  className="icon-btn"
                  onClick={handleSave}
                  disabled={saving || saved}
                  title={
                    saved
                      ? 'Saved'
                      : saving
                      ? 'Saving...'
                      : 'Save Property'
                  }
                  style={{
                    cursor:
                      saved || saving ? 'not-allowed' : 'pointer',
                    opacity: saving ? 0.7 : 1,
                  }}
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