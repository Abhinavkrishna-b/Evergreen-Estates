import './UserManagementTable.css';

import { useState } from 'react';
import {
  FiEye,
  FiTrash2,
  FiSlash
} from 'react-icons/fi';

const mockUsers = [
  {
    id: 1,
    name: 'Raj Kumar',
    email: 'raj@gmail.com',
    role: 'Seller',
    joined: '12 Jun 2025'
  },
  {
    id: 2,
    name: 'Priya Sharma',
    email: 'priya@gmail.com',
    role: 'Buyer',
    joined: '15 Jun 2025'
  },
  {
    id: 3,
    name: 'Arun Kumar',
    email: 'arun@gmail.com',
    role: 'Seller',
    joined: '18 Jun 2025'
  }
];

const UserManagementTable = () => {

  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = mockUsers.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="user-table-wrapper">

      <div className="user-table-toolbar">

        <input
          type="text"
          placeholder="Search users..."
          className="user-search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

      </div>

      <table className="user-table">

        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Joined</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {filteredUsers.map((user) => (

            <tr key={user.id}>

              <td>{user.name}</td>

              <td>{user.email}</td>

              <td>
                <span className={`role-badge ${user.role.toLowerCase()}`}>
                  {user.role}
                </span>
              </td>

              <td>{user.joined}</td>

              <td>

                <div className="user-actions">

                  <button
                    className="user-action-btn"
                    title="View User"
                  >
                    <FiEye />
                  </button>

                  <button
                    className="user-action-btn suspend"
                    title="Suspend User"
                  >
                    <FiSlash />
                  </button>

                  <button
                    className="user-action-btn delete"
                    title="Delete User"
                  >
                    <FiTrash2 />
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

export default UserManagementTable;