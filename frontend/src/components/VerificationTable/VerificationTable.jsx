import './VerificationTable.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiEye,
  FiCheck,
  FiX
} from 'react-icons/fi';

import { featuredProperties } from '../../constants/properties';

const VerificationTable = () => {

  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');

  const pendingProperties = featuredProperties.filter(property => {

    const matchesSearch =
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;

  });

  const handleApprove = (id) => {
    console.log('Approve:', id);
  };

  const handleReject = (id) => {
    console.log('Reject:', id);
  };

  return (
    <div className="verification-wrapper">

      <div className="verification-stats">

        <div className="verification-stat-card">
          <h3>{pendingProperties.length}</h3>
          <p>Pending Reviews</p>
        </div>

        <div className="verification-stat-card">
          <h3>4</h3>
          <p>Approved Today</p>
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

          {pendingProperties.map((property) => (

            <tr key={property.id}>

              <td>
                <div className="verification-property-title">
                  {property.title}
                </div>

                <div className="verification-location">
                  {property.location}
                </div>
              </td>

              <td>
                {property.agent?.name}
              </td>

              <td>
                {property.type}
              </td>

              <td className="verification-price">
                {property.price}
              </td>

              <td>

                <div className="verification-actions">

                  <button
                    className="verification-btn"
                    onClick={() =>
                      navigate(`/admin/properties/${property.id}`)
                    }
                  >
                    <FiEye />
                  </button>

                  <button
                    className="verification-btn approve"
                    onClick={() => handleApprove(property.id)}
                  >
                    <FiCheck />
                  </button>

                  <button
                    className="verification-btn reject"
                    onClick={() => handleReject(property.id)}
                  >
                    <FiX />
                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default VerificationTable;