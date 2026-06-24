import { useState, useEffect } from 'react';
import { FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import HorizontalCard from '../HorizontalCard/HorizontalCard';
import { getMyProperties, deleteProperty } from '../../services/propertyService';
import './MyListings.css';

const MyListings = () => {
  const navigate = useNavigate();
  const [myProperties, setMyProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMyProperties = async () => {
      try {
        const result = await getMyProperties();
        setMyProperties(result);
      } catch (err) {
        setError('Failed to load your properties.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyProperties();
  }, []);

  const handleEdit = (e, propertyId) => {
    e.stopPropagation();
    navigate(`/edit-post/${propertyId}`);
  };

  const handleDelete = async (e, propertyId) => {
    e.stopPropagation();
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this property?"
    );
    if (!isConfirmed) return;

    try {
      await deleteProperty(propertyId);
      setMyProperties(prev =>
        prev.filter(p => p._id !== propertyId)
      );
    } catch (err) {
      console.error('Failed to delete property:', err);
      alert('Failed to delete. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="my-listings-container">
        <div className="section-header">
          <h2>My Properties</h2>
          <button className="create-post-btn" onClick={() => navigate('/create-post')}>
            <FiPlus size={18} /> Create Post
          </button>
        </div>
        <p style={{ padding: '20px' }}>Loading your properties...</p>
      </div>
    );
  }

  return (
    <div className="my-listings-container">
      <div className="section-header">
        <h2>My Properties</h2>
        <button
          className="create-post-btn"
          onClick={() => navigate('/create-post')}
        >
          <FiPlus size={18} /> Create Post
        </button>
      </div>

      {error && <p style={{ color: 'red', padding: '20px' }}>{error}</p>}

      {!loading && !error && myProperties.length === 0 && (
        <p style={{ padding: '20px', color: '#888' }}>
          You have no listings yet. Create your first property!
        </p>
      )}

      <div className="property-list">
        {myProperties.map(property => (
          <HorizontalCard
            key={property._id}
            property={property}
            customActions={
              <>
                <span style={{
                  fontSize: '11px',
                  padding: '2px 8px',
                  borderRadius: '10px',
                  background:
                    property.verification?.status === 'approved' ? '#d4edda' :
                    property.verification?.status === 'rejected' ? '#f8d7da' :
                    '#fff3cd',
                  color:
                    property.verification?.status === 'approved' ? '#155724' :
                    property.verification?.status === 'rejected' ? '#721c24' :
                    '#856404',
                }}>
                  {property.verification?.status || 'pending'}
                </span>

                <button
                  className="icon-btn edit-action"
                  onClick={(e) => handleEdit(e, property._id)}
                  title="Edit Property"
                >
                  <FiEdit />
                </button>
                <button
                  className="icon-btn delete-action"
                  onClick={(e) => handleDelete(e, property._id)}
                  title="Delete Property"
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

export default MyListings;