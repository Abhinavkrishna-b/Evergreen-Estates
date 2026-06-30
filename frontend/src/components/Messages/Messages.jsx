import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getMyConversations } from '../../services/messageService';
import ChatBox from '../ChatBox/ChatBox';
import './Messages.css';

const POLL_INTERVAL = 5000; // refetch conversation list every 5 seconds

const Messages = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeConversation, setActiveConversation] = useState(null);

  const fetchConversations = async () => {
    try {
      const data = await getMyConversations();
      setConversations(data);
    } catch (err) {
      console.error('Failed to load conversations:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  useEffect(() => {
    const interval = setInterval(fetchConversations, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  const getOtherPerson = (conversation) => {
    if (!user) return {};
    return conversation.buyerId?._id === user.id
      ? conversation.sellerId
      : conversation.buyerId;
  };

  const getUnreadCount = (conversation) => {
    if (!user) return 0;
    return conversation.buyerId?._id === user.id
      ? conversation.unreadBuyer || 0
      : conversation.unreadSeller || 0;
  };

  const handleOpenConversation = (conv) => {
    setActiveConversation(conv);
    setConversations(prev =>
      prev.map(c =>
        c._id === conv._id
          ? {
              ...c,
              unreadBuyer: c.buyerId?._id === user?.id ? 0 : c.unreadBuyer,
              unreadSeller: c.sellerId?._id === user?.id ? 0 : c.unreadSeller,
            }
          : c
      )
    );
  };

  return (
    <>
      <div className="messages-container">
        <div className="section-header">
          <h2>Messages</h2>
        </div>

        <div className="messages-list">
          {loading && (
            <p style={{ padding: '20px', color: '#888' }}>Loading...</p>
          )}

          {!loading && conversations.length === 0 && (
            <p style={{ padding: '20px', color: '#888' }}>No messages yet.</p>
          )}

          {conversations.map(conv => {
            const other = getOtherPerson(conv);
            const unread = getUnreadCount(conv);
            const isActive = activeConversation?._id === conv._id;

            return (
              <div
                key={conv._id}
                className={`message-card ${unread > 0 ? 'unread' : ''} ${isActive ? 'selected' : ''}`}
                onClick={() => handleOpenConversation(conv)}
              >
                <img
                  src={other?.avatarUrl ||
                    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"}
                  alt={other?.fullName || 'User'}
                  className="message-avatar"
                />
                <div className="message-content">
                  <span className="message-name">{other?.fullName || 'User'}</span>
                  <p className="message-text">
                    {conv.lastMessage || conv.propertyId?.title || 'New conversation'}
                  </p>
                </div>
                {unread > 0 && (
                  <span style={{
                    background: '#1a6b3c', color: 'white', borderRadius: '50%',
                    minWidth: '20px', height: '20px', display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    fontSize: '11px', flexShrink: 0, padding: '0 4px',
                  }}>
                    {unread}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {activeConversation && (
        <ChatBox
          conversation={activeConversation}
          onClose={() => setActiveConversation(null)}
          onMessageSent={(conversationId, lastMessage) => {
            setConversations(prev =>
              prev.map(c =>
                c._id === conversationId
                  ? { ...c, lastMessage, lastMessageAt: new Date() }
                  : c
              )
            );
          }}
        />
      )}
    </>
  );
};

export default Messages;
