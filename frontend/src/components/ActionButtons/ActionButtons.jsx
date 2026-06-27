import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMessageSquare, FiBookmark } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { saveProperty } from '../../services/propertyService';
import { startOrGetConversation } from '../../services/messageService';
import ChatBox from '../ChatBox/ChatBox';
import './ActionButtons.css';

const ActionButtons = ({ property }) => {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuth();

  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeConversation, setActiveConversation] = useState(null);
  const [openingChat, setOpeningChat] = useState(false);

  const handleMessage = async () => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    // Prevent seller messaging their own property
    if (property.sellerId?._id === user?.id) {
      alert("This is your own property listing.");
      return;
    }

    setOpeningChat(true);
    try {
      const conversation = await startOrGetConversation(
        property._id,
        property.sellerId?._id
      );
      setActiveConversation(conversation);
    } catch (err) {
      console.error('Failed to open conversation:', err);
      alert('Failed to open chat. Please try again.');
    } finally {
      setOpeningChat(false);
    }
  };

  const handleSave = async () => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    if (saved) return;

    setSaving(true);
    try {
      await saveProperty(property._id);
      setSaved(true);
    } catch (err) {
      if (err.response?.status === 400) {
        setSaved(true);
      } else {
        console.error('Save failed:', err);
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="action-buttons-container">

        <button
          className="action-btn outline-btn"
          onClick={handleMessage}
          disabled={openingChat}
        >
          <FiMessageSquare className="btn-icon" />
          {openingChat ? 'Opening...' : 'Send a Message'}
        </button>

        <button
          className="action-btn outline-btn"
          onClick={handleSave}
          disabled={saving || saved}
          style={{
            cursor: saved || saving ? 'not-allowed' : 'pointer',
            opacity: saving ? 0.7 : 1,
          }}
        >
          <FiBookmark className="btn-icon" />
          {saving ? 'Saving...' : saved ? 'Saved!' : 'Save the Place'}
        </button>

      </div>

      {/* ChatBox opens when message button is clicked */}  
      {activeConversation && (
        <ChatBox
          conversation={activeConversation}
          onClose={() => setActiveConversation(null)}
          onMessageSent={() => {}}
        />
      )}
    </>
  );
};

export default ActionButtons;