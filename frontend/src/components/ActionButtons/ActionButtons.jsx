import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMessageSquare, FiBookmark } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { saveProperty } from '../../services/propertyService';
import './ActionButtons.css';

const ActionButtons = ({ property }) => {
  const navigate = useNavigate();
  
  // Real authentication state from your context
  const { isLoggedIn } = useAuth();
  
  // Backend States for the Save button
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  // Handle Messaging
  const handleMessage = (e) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      navigate('/login');
      console.log("User not logged in, redirecting...");
    } else {
      // User is logged in - Redirect to profile or messages page
      navigate('/profile');
      console.log("Redirecting to messaging/profile...");
    }
  };

  // Handle Saving Property
  const handleSave = async (e) => {
    e.stopPropagation();

    // 1. Check if logged in
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    // 2. Prevent spam clicks if already saved
    if (saved) return;

    // 3. Trigger API Call
    setSaving(true);
    try {
      await saveProperty(property._id);
      setSaved(true);
    } catch (err) {
      // If backend returns 400, it means it's already in the user's saved list
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
    <div className="action-buttons-container">
      
      <button 
        className="action-btn outline-btn"
        onClick={handleMessage}
      >
        <FiMessageSquare className="btn-icon" />
        Send a Message
      </button>
      
      <button 
        className="action-btn outline-btn"
        onClick={handleSave}
        disabled={saving || saved}
        style={{ 
          cursor: saved || saving ? 'not-allowed' : 'pointer',
          opacity: saving ? 0.7 : 1
        }}
      >
        <FiBookmark className="btn-icon" />
        {saving ? 'Saving...' : saved ? 'Saved!' : 'Save the Place'}
      </button>
      
    </div>
  );
};

export default ActionButtons;