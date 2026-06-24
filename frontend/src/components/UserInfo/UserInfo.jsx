import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './UserInfo.css';

const UserInfo = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="user-info-container">
      <div className="section-header">
        <h2>User Information</h2>
        <button className="update-btn">Update Profile</button>
      </div>

      <div className="info-details">

        <div className="info-row">
          <span className="info-label">Avatar:</span>
          <img
            src={user?.avatarUrl ||
              "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop"}
            alt="User Avatar"
            className="avatar-img"
          />
        </div>

        <div className="info-row">
          <span className="info-label">Username:</span>
          <span className="info-value">{user?.fullName || '—'}</span>
        </div>

        <div className="info-row">
          <span className="info-label">E-mail:</span>
          <span className="info-value">{user?.email || '—'}</span>
        </div>

        {user?.phone && (
          <div className="info-row">
            <span className="info-label">Phone:</span>
            <span className="info-value">{user.phone}</span>
          </div>
        )}

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>

      </div>
    </div>
  );
};

export default UserInfo;