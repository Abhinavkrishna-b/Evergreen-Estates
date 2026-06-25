import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiCheck, FiX } from 'react-icons/fi';
import { getPendingProperties, verifyProperty } from '../../services/adminService';
import './VerificationTable.css';

const VerificationTable = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getPendingProperties();
        setProperties(data);
      } catch (err) {
        console.error('Failed to load pending:', err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const handleApprove = async (id) => {
    if (!window.confirm('Approve this property listing?')) return;
    try {
      await verifyProperty(id, 'approve');
      setProperties(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      console.error('Approve failed:', err);
      alert('Failed to approve.');
    }
  };

  const handleReject = async (id) => {
    const reason = window.prompt('Enter rejection reason:');
    if (!reason) return;
    try {
      await verifyProperty(id, 'reject', reason);
      setProperties(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      console.error('Reject failed:', err);
      alert('Failed to reject.');
    }
  };

  const filtered = properties.filter(p =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.city?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="verification-wrapper">

      <div className="verification-stats">
        <div className="verification-stat-card">
          <h3>{properties.length}</h3>
          <p>Pending Reviews</p>
        </div>
      </div>

      <div className="verification-toolbar">
        <input
          type="text"
          placeholder="Search pending properties..."
          className="verification-search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading && <p style={{ padding: '20px', textAlign: 'center' }}>Loading...</p>}

      <table className="verification-table">
        <thead>
          <tr>
            <th>Property</th>
            <th>Seller</th>
            <th>Type</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(property => (
            <tr key={property._id}>
              <td>
                <div className="verification-property-title">{property.title}</div>
                <div className="verification-location">
                  {property.locality}, {property.city}
                </div>
              </td>
              <td>{property.sellerId?.fullName || '—'}</td>
              <td>{property.propertyType}</td>
              <td className="verification-price">
                ₹{property.price?.toLocaleString('en-IN')}
              </td>
              <td>
                <div className="verification-actions">
                  <button
                    className="verification-btn"
                    title="View"
                    onClick={() => navigate(`/admin/properties/${property._id}`)}
                  >
                    <FiEye />
                  </button>
                  <button
                    className="verification-btn approve"
                    title="Approve"
                    onClick={() => handleApprove(property._id)}
                  >
                    <FiCheck />
                  </button>
                  <button
                    className="verification-btn reject"
                    title="Reject"
                    onClick={() => handleReject(property._id)}
                  >
                    <FiX />
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {!loading && filtered.length === 0 && (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center', padding: '30px', color: '#666' }}>
                No pending properties.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default VerificationTable;
