import { useState } from 'react';
import ChatBox from '../ChatBox/ChatBox';
import './Messages.css';

// Messages will be connected when messaging module is built
// For now showing empty state with correct structure
const Messages = () => {
  const [activeChatId, setActiveChatId] = useState(null);
  const [messages] = useState([]);

  const activeUser = messages.find(msg => msg.id === activeChatId);

  return (
    <>
      <div className="messages-container">
        <div className="section-header">
          <h2>Messages</h2>
        </div>

        <div className="messages-list">
          {messages.length === 0 ? (
            <p style={{ padding: '20px', color: '#888' }}>
              No messages yet.
            </p>
          ) : (
            messages.map(msg => (
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
            ))
          )}
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