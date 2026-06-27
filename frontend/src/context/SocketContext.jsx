import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./AuthContext";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { user, isLoggedIn } = useAuth();
  const socketRef = useRef(null);
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!isLoggedIn || !user) {
      // Disconnect if user logs out
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
        Promise.resolve().then(() => {
          setSocket(null);
          setConnected(false);
        });
      }
      return;
    }

    // Create socket connection
    const s = io("http://localhost:5000", {
      transports: ["websocket"],
    });
    socketRef.current = s;
    Promise.resolve().then(() => setSocket(s));

    const handleConnect = () => {
      setConnected(true);
      s.emit("join", user.id);
      console.log("Socket connected, joined room:", user.id);
    };

    const handleDisconnect = () => {
      setConnected(false);
    };

    s.on("connect", handleConnect);
    s.on("disconnect", handleDisconnect);

    // Cleanup on logout
    return () => {
      if (socketRef.current) {
        socketRef.current.off("connect", handleConnect);
        socketRef.current.off("disconnect", handleDisconnect);
        socketRef.current.disconnect();
        socketRef.current = null;
        Promise.resolve().then(() => {
          setSocket(null);
          setConnected(false);
        });
      }
    };
  }, [isLoggedIn, user]);

  return (
    <SocketContext.Provider value={{ socket, connected }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
