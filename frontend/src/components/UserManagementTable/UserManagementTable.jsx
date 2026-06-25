import { useState, useEffect } from 'react';
import { FiEye, FiTrash2, FiSlash, FiCheckCircle } from 'react-icons/fi';
import { getAllUsers, banUser, unbanUser, deleteUser } from '../../services/adminService';
import './UserManagementTable.css';

const UserManagementTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data);
      } catch (err) {
        console.error('Failed to load users:', err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const handleBanToggle = async (user) => {
    const isBanned = user.accountStatus === 'banned';
    const action = isBanned ? 'Unban' : 'Ban';
    if (!window.confirm(`${action} this user?`)) return;
    try {
      if (isBanned) {
        await unbanUser(user._id);
        setUsers(prev =>
          prev.map(u => u._id === user._id ? { ...u, accountStatus: 'active' } : u)
        );
      } else {
        await banUser(user._id);
        setUsers(prev =>
          prev.map(u => u._id === user._id ? { ...u, accountStatus: 'banned' } : u)
        );
      }
    } catch (err) {
      console.error(`${action} failed:`, err);
      alert(`Failed to ${action.toLowerCase()} user.`);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Permanently delete this user and all their data?')) return;
    try {
      await deleteUser(id);
      setUsers(prev => prev.filter(u => u._id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Failed to delete user.');
    }
  };

  const filtered = users.filter(u =>
    u.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
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

      {loading && <p style={{ padding: '20px', textAlign: 'center' }}>Loading...</p>}

      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Joined</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(user => (
            <tr key={user._id}>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>
                <span className={`role-badge ${user.roles?.[0]}`}>
                  {user.roles?.join(', ')}
                </span>
              </td>
              <td>
                <span style={{
                  fontSize: '11px',
                  padding: '2px 8px',
                  borderRadius: '10px',
                  background: user.accountStatus === 'active' ? '#d4edda' : '#f8d7da',
                  color: user.accountStatus === 'active' ? '#155724' : '#721c24',
                }}>
                  {user.accountStatus}
                </span>
              </td>
              <td>
                {new Date(user.createdAt).toLocaleDateString('en-IN')}
              </td>
              <td>
                <div className="user-actions">
                  <button
                    className={`user-action-btn ${user.accountStatus === 'banned' ? '' : 'suspend'}`}
                    title={user.accountStatus === 'banned' ? 'Unban User' : 'Ban User'}
                    onClick={() => handleBanToggle(user)}
                  >
                    {user.accountStatus === 'banned' ? <FiCheckCircle /> : <FiSlash />}
                  </button>
                  <button
                    className="user-action-btn delete"
                    title="Delete User"
                    onClick={() => handleDelete(user._id)}
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
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagementTable;