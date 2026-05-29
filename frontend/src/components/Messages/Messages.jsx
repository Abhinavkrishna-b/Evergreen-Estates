import { useState } from 'react';
import { mockMessages } from '../../constants/properties';
import ChatBox from '../ChatBox/ChatBox'; 
import './Messages.css';

const Messages = () => {
  const [activeChatId, setActiveChatId] = useState(null);

  // State to track the ID of the clicked/active message
  const activeUser = mockMessages.find(msg => msg.id === activeChatId);

  return (
    <>
      <div className="messages-container">
        <div className="section-header">
          <h2>Messages</h2>
        </div>
        
        <div className="messages-list">
          {mockMessages.map(msg => (
            <div 
              key={msg.id} 
              className={`message-card ${msg.unread ? 'unread' : ''} ${activeChatId === msg.id ? 'selected' : ''}`}
              onClick={() => setActiveChatId(msg.id)}
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

      {activeUser && (
        <ChatBox 
          chatUser={activeUser} 
          onClose={() => setActiveChatId(null)} 
        />
      )}
    </>
  );
};

export default Messages;
