import { useState, useRef, useEffect } from 'react';
import { FiX, FiSend } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { useSocket } from '../../context/SocketContext';
import { getMessages } from '../../services/messageService';
import './ChatBox.css';

const ChatBox = ({ conversation, onClose, onMessageSent }) => {
  const { user } = useAuth();
  const { socket } = useSocket();
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

  // Determine the other person in the conversation
  const isBuyer = conversation.buyerId?._id === user?.id;
  const otherPerson = isBuyer
    ? conversation.sellerId
    : conversation.buyerId;

  // Scroll to bottom whenever messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch existing messages when ChatBox opens
  useEffect(() => {
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

    fetchMessages();
  }, [conversation._id]);

  useEffect(() => {
    if (!socket) return;

    // Join this specific conversation's socket room
    socket.emit('joinConversation', conversation._id);

    // Listen for new messages in real-time
    const handleReceiveMessage = (newMessage) => {
      setMessages(prev => {
        const exists = prev.some(m => m._id === newMessage._id);
        if (exists) return prev;
        return [...prev, newMessage];
      });
    };

    socket.on('receiveMessage', handleReceiveMessage);

    // Mark messages as read when opening the chat
    socket.emit('markRead', {
      conversationId: conversation._id,
      userId: user?.id,
    });

    return () => {
      socket.off('receiveMessage', handleReceiveMessage);
    };
  }, [socket, conversation._id, user?.id]);

  const handleSend = () => {
    if (!inputText.trim() || !socket) return;

    // Emit message via Socket.io
    // Server saves to DB and broadcasts to room
    socket.emit('sendMessage', {
      conversationId: conversation._id,
      senderId: user.id,
      text: inputText.trim(),
    });

    // Update conversation list preview in Messages panel
    onMessageSent?.(conversation._id, inputText.trim());

    setInputText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Format timestamp
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

      {/* HEADER */}
      <div className="chatbox-header">
        <div className="chatbox-user-info">
          <img
            src={otherPerson?.avatarUrl ||
              "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"}
            alt={otherPerson?.fullName}
            className="chatbox-avatar"
          />
          <div>
            <span className="chatbox-name">{otherPerson?.fullName}</span>
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

      {/* MESSAGE HISTORY */}
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
            <div
              key={msg._id}
              className={`chat-message ${isMe ? 'msg-mine' : 'msg-theirs'}`}
            >
              <p>{msg.text}</p>
              <span className="msg-time">{formatTime(msg.createdAt)}</span>
            </div>
          );
        })}

        <div ref={messagesEndRef} />
      </div>

      {/* INPUT */}
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
          disabled={!inputText.trim()}
        >
          <FiSend size={18} />
        </button>
      </div>

    </div>
  );
};

export default ChatBox;
