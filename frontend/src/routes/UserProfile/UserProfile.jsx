import Navbar from '../../components/Navbar/Navbar';
import UserInfo from '../../components/UserInfo/UserInfo';
import SavedList from '../../components/SavedList/SavedList';
import './UserProfile.css';

const UserProfile = () => {
  return (
    <>
      <Navbar />
      
      <div className="profile-page-layout">
        <div className="profile-container">
          
          <div className="profile-main-column">
            <UserInfo />

            <SavedList />
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