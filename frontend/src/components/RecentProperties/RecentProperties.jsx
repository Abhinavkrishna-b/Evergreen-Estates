import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDashboardStats } from '../../services/adminService';
import './RecentProperties.css';

const RecentProperties = () => {
  const navigate = useNavigate();
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getDashboardStats();
        setRecent(data.recentProperties);
      } catch (err) {
        console.error('Failed to load recent:', err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return (
    <div className="admin-panel">
      <h3>Recent Properties</h3>

      {loading && <p style={{ padding: '10px', color: '#888' }}>Loading...</p>}

      {!loading && recent.length === 0 && (
        <p style={{ padding: '10px', color: '#888' }}>No properties yet.</p>
      )}

      {recent.map(property => (
        <div
          key={property._id}
          className="panel-item"
          style={{ cursor: 'pointer' }}
          onClick={() => navigate(`/admin/properties/${property._id}`)}
        >
          <div style={{ fontWeight: '500' }}>{property.title}</div>
          <div style={{ fontSize: '12px', color: '#888' }}>
            {property.locality}, {property.city} ·{' '}
            <span style={{
              color:
                property.verification?.status === 'approved' ? 'green' :
                property.verification?.status === 'rejected' ? 'red' :
                '#b8860b'
            }}>
              {property.verification?.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentProperties;