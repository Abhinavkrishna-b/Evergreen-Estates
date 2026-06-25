import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiTrash2 } from 'react-icons/fi';
import { getAllPropertiesAdmin, forceDeleteProperty } from '../../services/adminService';
import './PropertyManagementTable.css';

const PropertyManagementTable = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getAllPropertiesAdmin();
        setProperties(data);
      } catch (err) {
        console.error('Failed to load properties:', err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (!window.confirm('Delete this property permanently?')) return;
    try {
      await forceDeleteProperty(id);
      setProperties(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Failed to delete.');
    }
  };

  const filtered = properties.filter(p => {
    const matchSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.city?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchFilter =
      activeFilter === 'All'
        ? true
        : p.propertyType.toLowerCase() === activeFilter.toLowerCase();
    return matchSearch && matchFilter;
  });

  const filters = ['All', 'Villa', 'Apartment', 'House', 'Land'];

  return (
    <div className="property-table-wrapper">

      <div className="property-table-toolbar">
        <input
          type="text"
          placeholder="Search by title or city..."
          className="property-search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="property-filters">
        {filters.map(f => (
          <button
            key={f}
            className={`filter-btn ${activeFilter === f ? 'active' : ''}`}
            onClick={() => setActiveFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {loading && <p style={{ padding: '20px', textAlign: 'center' }}>Loading...</p>}

      <table className="property-table">
        <thead>
          <tr>
            <th>Property</th>
            <th>Seller</th>
            <th>Type</th>
            <th>Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(property => (
            <tr key={property._id}>
              <td>
                <div className="property-title">{property.title}</div>
                <div className="property-location">
                  {property.locality}, {property.city}
                </div>
              </td>
              <td>{property.sellerId?.fullName || '—'}</td>
              <td>{property.propertyType}</td>
              <td>
                <span className="property-price">
                  ₹{property.price?.toLocaleString('en-IN')}
                </span>
              </td>
              <td>
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
                  {property.verification?.status}
                </span>
              </td>
              <td>
                <div className="action-group">
                  <button
                    className="action-btn"
                    title="View Property"
                    onClick={() => navigate(`/admin/properties/${property._id}`)}
                  >
                    <FiEye />
                  </button>
                  <button
                    className="action-btn delete"
                    title="Delete Property"
                    onClick={(e) => handleDelete(e, property._id)}
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {!loading && filtered.length === 0 && (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center', padding: '30px', color: '#666' }}>
                No properties found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PropertyManagementTable;

