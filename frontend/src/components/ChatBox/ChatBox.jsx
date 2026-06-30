import { useState, useRef, useEffect } from 'react';
import { FiX, FiSend } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { getMessages, sendMessage } from '../../services/messageService';
import './ChatBox.css';

const POLL_INTERVAL = 3000; // refetch messages every 3 seconds

const ChatBox = ({ conversation, onClose, onMessageSent }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);

  const isBuyer = conversation.buyerId?._id === user?.id;
  const otherPerson = isBuyer ? conversation.sellerId : conversation.buyerId;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch messages function — reused for initial load and polling
  const fetchMessages = async () => {
    try {
      const data = await getMessages(conversation._id);
      setMessages(data);
    } catch (err) {
      console.error('Failed to load messages:', err);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchMessages();
  }, [conversation._id]);

  // Poll for new messages every few seconds
  // Simple way to simulate real-time without Socket.io
  useEffect(() => {
    const interval = setInterval(fetchMessages, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, [conversation._id]);

  const handleSend = async () => {
    if (!inputText.trim() || sending) return;

    setSending(true);
    const textToSend = inputText.trim();
    setInputText('');

    try {
      const newMessage = await sendMessage(conversation._id, textToSend);
      setMessages(prev => [...prev, newMessage]);
      onMessageSent?.(conversation._id, textToSend);
    } catch (err) {
      console.error('Failed to send message:', err);
      alert('Failed to send. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString('en-IN');
  };

  return (
    <div className="chatbox-overlay">

      <div className="chatbox-header">
        <div className="chatbox-user-info">
          <img
            src={otherPerson?.avatarUrl ||
              "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"}
            alt={otherPerson?.fullName || 'User'}
            className="chatbox-avatar"
          />
          <div>
            <span className="chatbox-name">{otherPerson?.fullName || 'User'}</span>
            {conversation.propertyId?.title && (
              <p style={{ fontSize: '11px', color: '#888', margin: 0 }}>
                Re: {conversation.propertyId.title}
              </p>
            )}
          </div>
        </div>
        <button className="chatbox-close-btn" onClick={onClose}>
          <FiX size={20} />
        </button>
      </div>

      <div className="chatbox-body">
        {loading && (
          <p style={{ textAlign: 'center', color: '#888', padding: '20px' }}>
            Loading messages...
          </p>
        )}

        {!loading && messages.length === 0 && (
          <p style={{ textAlign: 'center', color: '#888', padding: '20px' }}>
            No messages yet. Say hello!
          </p>
        )}

        {messages.map(msg => {
          const isMe = msg.senderId?._id === user?.id;
          return (
            <div key={msg._id} className={`chat-message ${isMe ? 'msg-mine' : 'msg-theirs'}`}>
              <p>{msg.text}</p>
              <span className="msg-time">{formatTime(msg.createdAt)}</span>
            </div>
          );
        })}

        <div ref={messagesEndRef} />
      </div>

      <div className="chatbox-footer">
        <textarea
          placeholder="Type a message..."
          className="chatbox-input"
          rows="1"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="chatbox-send-btn"
          onClick={handleSend}
          disabled={!inputText.trim() || sending}
        >
          <FiSend size={18} />
        </button>
      </div>

    </div>
  );
};

export default ChatBox;
