import { useState, useRef, useEffect } from 'react';
import { FiX, FiSend } from 'react-icons/fi';
import './ChatBox.css';

const ChatBox = ({ chatUser, onClose }) => {

  // 1. State for the input field
  const [inputText, setInputText] = useState("");

  // Mock conversation history specifically for this view
  const [conversation, setConversation] = useState([
    { id: 1, text: "Hi, is the property still available?", sender: "them", time: "3 hours ago" },
    { id: 2, text: "Yes it is! Are you looking to schedule a viewing?", sender: "me", time: "2 hours ago" },
    { id: 3, text: "That sounds fantastic! Is public transportation easily accessible?", sender: "them", time: "2 hours ago" },
    { id: 4, text: "Absolutely, there's a metro station just a 5-minute walk away.", sender: "me", time: "1 hour ago" },
    { id: 5, text: chatUser.text, sender: "them", time: "Just now" } 
  ]);

  // 3. Ref to handle auto-scrolling to the bottom of the chat
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Trigger scroll every time the conversation array changes
  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  // 4. Function to handle sending a new message
  const handleSendMessage = () => {
    // Prevent sending empty messages
    if (inputText.trim() === "") return;

    const newMessage = {
      id: Date.now(), // Generate a unique ID
      text: inputText,
      sender: "me",
      time: "Just now"
    };

    // Add new message to the existing conversation
    setConversation((prev) => [...prev, newMessage]);
    
    // Clear the input field
    setInputText("");
  };

  // 5. Allow sending by pressing the 'Enter' key
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevents adding a new line in the textarea
      handleSendMessage();
    }
  };

  if (!chatUser) return null;

  return (
    <div className="chatbox-overlay">
      {/* HEADER */}
      <div className="chatbox-header">
        <div className="chatbox-user-info">
          <img src={chatUser.avatar} alt={chatUser.name} className="chatbox-avatar" />
          <span className="chatbox-name">{chatUser.name}</span>
        </div>
        <button className="chatbox-close-btn" onClick={onClose} aria-label="Close Chat">
          <FiX size={20} />
        </button>
      </div>

      {/* MESSAGE HISTORY */}
      <div className="chatbox-body">
        {conversation.map((msg) => (
          <div key={msg.id} className={`chat-message ${msg.sender === 'me' ? 'msg-mine' : 'msg-theirs'}`}>
            <p>{msg.text}</p>
            <span className="msg-time">{msg.time}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* INPUT AREA */}
      <div className="chatbox-footer">
        <textarea 
          placeholder="Type a message..." 
          className="chatbox-input"
          rows="1"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
        ></textarea>
        <button className="chatbox-send-btn" onClick={handleSendMessage} aria-label="Send Message">
          <FiSend size={18} />
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
  