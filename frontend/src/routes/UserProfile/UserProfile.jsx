import Navbar from '../../components/Navbar/Navbar';
import UserInfo from '../../components/UserInfo/UserInfo';
import SavedList from '../../components/SavedList/SavedList';
import Messages from '../../components/Messages/Messages';
import Footer from '../../components/Footer/Footer';
import './UserProfile.css';

const UserProfile = () => {
  return (
    <>
      <Navbar />
      
      <div className="profile-page-layout">

        <div className="profile-container">
          
          {/* LEFT SIDE */}
          <div className="profile-main-column">
            <UserInfo />

            <SavedList />
          </div>

          {/* RIGHT SIDE */}
          <div className="profile-sidebar-column">
            <Messages />
          </div>

        </div>
      </div>
      <Footer/>
    </>
  );
};

export default UserProfile;