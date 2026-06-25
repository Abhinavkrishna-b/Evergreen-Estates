import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPendingProperties } from '../../services/adminService';
import './PendingVerifications.css';

const PendingVerifications = () => {
  const navigate = useNavigate();
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getPendingProperties();
        // Show only first 5 in dashboard 
        setPending(data.slice(0, 5));
      } catch (err) {
        console.error('Failed to load pending:', err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return (
    <div className="admin-panel">
      <h3>Pending Verifications</h3>

      {loading && <p style={{ padding: '10px', color: '#888' }}>Loading...</p>}

      {!loading && pending.length === 0 && (
        <p style={{ padding: '10px', color: '#888' }}>No pending verifications.</p>
      )}

      {pending.map(property => (
        <div
          key={property._id}
          className="panel-item"
          style={{ cursor: 'pointer' }}
          onClick={() => navigate(`/admin/properties/${property._id}`)}
        >
          <div style={{ fontWeight: '500' }}>{property.title}</div>
          <div style={{ fontSize: '12px', color: '#888' }}>
            {property.locality}, {property.city}
          </div>
        </div>
      ))}

      {pending.length > 0 && (
        <div
          style={{ padding: '10px', cursor: 'pointer', color: '#1a6b3c', fontSize: '13px' }}
          onClick={() => navigate('/admin/verifications')}
        >
          View all →
        </div>
      )}
    </div>
  );
};

export default PendingVerifications;