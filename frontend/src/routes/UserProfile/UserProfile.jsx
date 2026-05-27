import Navbar from '../../components/Navbar/Navbar';
import './UserProfile.css';

const UserProfile = () => {
  return (
    <>
      <Navbar />
      
      <div className="profile-page-layout">
        <div className="profile-container">
          
          {/* LEFT COLUMN: Main Content Area (flex: 2) */}
          <div className="profile-main-column">
            
            {/* 1. User Information Placeholder */}
            <div className="skeleton-placeholder">
              <h3>[ User Information Component ]</h3>
              <p>Avatar, Username, Email, Update Profile & Logout buttons will render here.</p>
            </div>

            {/* 2. My List (Property Feed) Placeholder */}
            <div className="skeleton-placeholder my-list-placeholder">
              <h3>[ My List Component ]</h3>
              <p>The list of horizontal property cards and the 'Create New Post' button will render here.</p>
            </div>

          </div>

          {/* RIGHT COLUMN: Sidebar Area (flex: 1) */}
          <div className="profile-sidebar-column">
            
            {/* 3. Messages Sidebar Placeholder */}
            <div className="skeleton-placeholder sidebar-placeholder">
              <h3>[ Messages Component ]</h3>
              <p>Vertical list of user chats and unread notifications will render here.</p>
            </div>

          </div>

        </div>
      </div>
    </>
  );
};

export default UserProfile;