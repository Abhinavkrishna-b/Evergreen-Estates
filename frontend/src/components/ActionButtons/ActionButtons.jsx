import { FiMessageSquare, FiBookmark } from 'react-icons/fi';
import './ActionButtons.css';

const ActionButtons = () => {
  return (
    <div className="action-buttons-container">
      <button className="action-btn outline-btn">
        <FiMessageSquare className="btn-icon" />
        Send a Message
      </button>
      
      <button className="action-btn outline-btn">
        <FiBookmark className="btn-icon" />
        Save the Place
      </button>
    </div>
  );
};

export default ActionButtons;