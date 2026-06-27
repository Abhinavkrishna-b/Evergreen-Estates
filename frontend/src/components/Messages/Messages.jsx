import { useState, useEffect } from "react";
import { getMyConversations } from "../../services/messageService";
import { useAuth } from "../../context/AuthContext";
import { useSocket } from "../../context/SocketContext";
import ChatBox from "../ChatBox/ChatBox";
import "./Messages.css";

const Messages = () => {
  const { user } = useAuth();
  const { socket } = useSocket();
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeConversation, setActiveConversation] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getMyConversations();
        setConversations(data);
      } catch (err) {
        console.error("Failed to load conversations:", err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  // Listen for real-time conversation updates
  // (new message received from another user)
  useEffect(() => {
    if (!socket) return;

    const handleConversationUpdated = ({ conversationId, lastMessage, lastMessageAt }) => {
      setConversations(prev =>
        prev.map(c =>
          c._id === conversationId
            ? { ...c, lastMessage, lastMessageAt }
            : c
        ).sort((a, b) =>
          new Date(b.lastMessageAt) - new Date(a.lastMessageAt)
        )
      );
    };

    socket.on("conversationUpdated", handleConversationUpdated);
    return () => socket.off("conversationUpdated", handleConversationUpdated);
  }, [socket]);

  // Get the other person's info in the conversation
  const getOtherPerson = (conversation) => {
    if (!user) return {};
    return conversation.buyerId?._id === user.id
      ? conversation.sellerId
      : conversation.buyerId;
  };

  return (
    <>
      <div className="messages-container">
        <div className="section-header">
          <h2>Messages</h2>
        </div>

        <div className="messages-list">
          {loading && (
            <p style={{ padding: "20px", color: "#888" }}>Loading...</p>
          )}

          {!loading && conversations.length === 0 && (
            <p style={{ padding: "20px", color: "#888" }}>
              No messages yet.
            </p>
          )}

          {conversations.map(conv => {
            const other = getOtherPerson(conv);
            const isMyConvActive = activeConversation?._id === conv._id;
            const isBuyer = conv.buyerId?._id === user?.id;
            const unread = isBuyer ? conv.unreadBuyer : conv.unreadSeller;

            return (
              <div
                key={conv._id}
                className={`message-card ${unread > 0 ? "unread" : ""} ${isMyConvActive ? "selected" : ""}`}
                onClick={() => setActiveConversation(conv)}
              >
                <img
                  src={other?.avatarUrl ||
                    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"}
                  alt={other?.fullName}
                  className="message-avatar"
                />
                <div className="message-content">
                  <span className="message-name">{other?.fullName}</span>
                  <p className="message-text">
                    {conv.lastMessage || conv.propertyId?.title || "New conversation"}
                  </p>
                </div>
                {unread > 0 && (
                  <span style={{
                    background: "#1a6b3c",
                    color: "white",
                    borderRadius: "50%",
                    width: "20px",
                    height: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "11px",
                    flexShrink: 0,
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