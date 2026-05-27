import { useNavigate } from 'react-router-dom';
import { FiMessageSquare, FiBookmark } from 'react-icons/fi';
import './ActionButtons.css';

const ActionButtons = () => {
  const navigate = useNavigate();

  // MOCK AUTH STATE: 
  const currentUser = true; //false - so you need to log in , true - then you already logged in

  const handleProtectedAction = (actionType) => {

    if (!currentUser) {
      // Not login - Redirect directly to login
      navigate('/login');
      console.log("User not logged in yet");
    } else {

      // User is logged in - Redirect to profile page
      if (actionType === 'save') {
        navigate('/profile');
        console.log("User already logged in");
      } else if (actionType === 'message') {
        navigate('/profile');
        console.log("User already logged in");
      }
    }
  };

  return (
    <>
      <div className="action-buttons-container">
        <button 
          className="action-btn outline-btn"
          onClick={() => handleProtectedAction('message')}
        >
          <FiMessageSquare className="btn-icon" />
          Send a Message
        </button>
        
        <button 
          className="action-btn outline-btn"
          onClick={() => handleProtectedAction('save')}
        >
          <FiBookmark className="btn-icon" />
          Save the Place
        </button>
      </div>
    </>
  );
};

export default ActionButtons;