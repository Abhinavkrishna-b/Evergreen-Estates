import { useState, useEffect } from 'react';
import { FiMessageSquare, FiTrash2 } from 'react-icons/fi';
import HorizontalCard from '../HorizontalCard/HorizontalCard';
import { getSavedProperties, unsaveProperty } from '../../services/propertyService';
import './SavedList.css';

const SavedList = () => {
  const [savedProperties, setSavedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSaved = async () => {
      try {
        const result = await getSavedProperties();
        setSavedProperties(result);
      } catch (err) {
        setError('Failed to load saved properties.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSaved();
  }, []);

  const handleMessage = (e, propertyId) => {
    e.stopPropagation();
    console.log(`Open message for property: ${propertyId}`);
  };

  const handleRemove = async (e, propertyId) => {
    e.stopPropagation();
    const isConfirmed = window.confirm(
      "Are you sure you want to remove this property from your saved list?"
    );
    if (!isConfirmed) return;

    try {
      await unsaveProperty(propertyId);
      setSavedProperties(prev =>
        prev.filter(p => p._id !== propertyId)
      );
    } catch (err) {
      console.error('Failed to remove property:', err);
      alert('Failed to remove. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="saved-list-container">
        <div className="section-header"><h2>My List</h2></div>
        <p style={{ padding: '20px' }}>Loading saved properties...</p>
      </div>
    );
  }

  return (
    <div className="saved-list-container">
      <div className="section-header">
        <h2>My List</h2>
      </div>

      {error && <p style={{ color: 'red', padding: '20px' }}>{error}</p>}

      {!loading && !error && savedProperties.length === 0 && (
        <p style={{ padding: '20px', color: '#888' }}>
          No saved properties yet. Browse properties and save ones you like!
        </p>
      )}

      <div className="property-list">
        {savedProperties.map(property => (
          <HorizontalCard
            key={property._id}
            property={property}
            customActions={
              <>
                <button
                  className="icon-btn"
                  onClick={(e) => handleMessage(e, property._id)}
                  title="Message Seller"
                >
                  <FiMessageSquare />
                </button>
                <button
                  className="icon-btn delete-action"
                  onClick={(e) => handleRemove(e, property._id)}
                  title="Remove from Saved"
                >
                  <FiTrash2 />
                </button>
              </>
            }
          />
        ))}
      </div>
    </div>
  );
};

export default SavedList;