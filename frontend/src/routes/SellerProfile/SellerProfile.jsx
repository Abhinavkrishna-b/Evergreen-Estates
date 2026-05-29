import Navbar from '../../components/Navbar/Navbar';
import UserInfo from '../../components/UserInfo/UserInfo';
import MyListings from '../../components/MyListings/MyListings';
import SavedList from '../../components/SavedList/SavedList';
import Messages from '../../components/Messages/Messages';
import Footer from '../../components/Footer/Footer';
import '../UserProfile/UserProfile.css'; 

const SellerProfile = () => {
  return (
    <>
      <Navbar />
      
      <div className="profile-page-layout">
        <div className="profile-container">
          
          {/* LEFT SIDE*/}
          <div className="profile-main-column">
            <UserInfo />
            <MyListings /> 
            <SavedList/>
          </div>

          {/* RIGHT SIDE*/}
          <div className="profile-sidebar-column">
            <Messages />
          </div>

        </div>
      </div>
      
      <Footer/>
    </>
  );
};

export default SellerProfile;