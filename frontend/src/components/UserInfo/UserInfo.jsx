import { useNavigate } from 'react-router-dom';
import './UserInfo.css';

const UserInfo = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="user-info-container">
      <div className="section-header">
        <h2>User Information</h2>
        <button className="update-btn">
          Update Profile
        </button>
      </div>
      
      <div className="info-details">
        {/* MOCK DATA */}

        <div className="info-row">
          <span className="info-label">Avatar:</span>
          <img 
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop" 
            alt="User Avatar" 
            className="avatar-img"
          />
        </div>
        
        <div className="info-row">
          <span className="info-label">Username:</span>
          <span className="info-value">john</span>
        </div>
        
        <div className="info-row">
          <span className="info-label">E-mail:</span>
          <span className="info-value">john@gmail.com</span>
        </div>
        
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserInfo;