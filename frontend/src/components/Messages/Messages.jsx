import { useState } from 'react';
import { mockMessages } from '../../constants/properties';
import './Messages.css';

const Messages = () => {

    // State to track the ID of the clicked/active message
    const [activeChat, setActiveChat] = useState(null);

    return (
        <div className="messages-container">
        <div className="section-header">
            <h2>Messages</h2>
        </div>
        
        <div className="messages-list">
            {mockMessages.map(msg => (
            <div 
                key={msg.id} 
                // Apply 'unread' if it's unread, AND apply 'selected' if it matches the activeChat state
                className={`message-card ${msg.unread ? 'unread' : ''} ${activeChat === msg.id ? 'selected' : ''}`}
                onClick={() => setActiveChat(msg.id)}
            >
                <img src={msg.avatar} alt={msg.name} className="message-avatar" />
                <div className="message-content">
                <span className="message-name">{msg.name}</span>
                <p className="message-text">{msg.text}</p>
                </div>
            </div>
            ))}
        </div>
        </div>
    );
    };

export default Messages;