import './PropertyManagementTable.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiTrash2 } from 'react-icons/fi';
import { featuredProperties } from '../../constants/properties';

const PropertyManagementTable = () => {

  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProperties = featuredProperties.filter((property) => {

    const matchesSearch =
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      activeFilter === 'All'
        ? true
        : property.propertyType.toLowerCase() === activeFilter.toLowerCase();

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="property-table-wrapper">

      <div className="property-table-toolbar">

        <input
          type="text"
          placeholder="Search property by location..."
          className="property-search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

      </div>

      <div className="property-filters">

        <button
          className={`filter-btn ${activeFilter === 'All' ? 'active' : ''}`}
          onClick={() => setActiveFilter('All')}
        >
          All
        </button>

        <button
          className={`filter-btn ${activeFilter === 'villa' ? 'active' : ''}`}
          onClick={() => setActiveFilter('villa')}
        >
          Villa
        </button>

        <button
          className={`filter-btn ${activeFilter === 'apartment' ? 'active' : ''}`}
          onClick={() => setActiveFilter('apartment')}
        >
          Apartment
        </button>

        <button
          className={`filter-btn ${activeFilter === 'house' ? 'active' : ''}`}
          onClick={() => setActiveFilter('house')}
        >
          House
        </button>

        <button
          className={`filter-btn ${activeFilter === 'land' ? 'active' : ''}`}
          onClick={() => setActiveFilter('land')}
        >
          Land
        </button>

      </div>

      <table className="property-table">

        <thead>
          <tr>
            <th>Property</th>
            <th>Owner</th>
            <th>Type</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {filteredProperties.map((property) => (

            <tr key={property.id}>

              <td>
                <div className="property-title">
                  {property.title}
                </div>

                <div className="property-location">
                  {property.location}
                </div>
              </td>

              <td>
                {property.agent?.name}
              </td>

              <td>
                {property.type}
              </td>

              <td>
                <span className="property-price">
                  {property.price}
                </span>
              </td>

              <td>

                <div className="action-group">

                  <button
                    className="action-btn"
                    title="View Property"
                    onClick={() =>
                      navigate(`/admin/properties/${property.id}`)
                    }
                  >
                    <FiEye />
                  </button>

                  <button
                    className="action-btn delete"
                    title="Delete Property"
                  >
                    <FiTrash2 />
                  </button>

                </div>

              </td>

            </tr>

          ))}

          {filteredProperties.length === 0 && (
            <tr>
              <td
                colSpan="5"
                style={{
                  textAlign: 'center',
                  padding: '30px',
                  color: '#666b7a'
                }}
              >
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
