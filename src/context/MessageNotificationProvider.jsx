import { createContext, useEffect, useRef } from "react";
import { queryClient } from "../queryClient";

const MessageNotificationContext = createContext();

/* eslint-disable react/prop-types */
export const MessageNotificationProvider = ({ children }) => {
  const socketRef = useRef();
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!token) return;
    const wsUrl = `ws://localhost:8000/ws/support/message-notifications/?token=${token}`;
    const socket = new WebSocket(wsUrl);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("Connected to message notification");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "invalidate_threads") {
        queryClient.invalidateQueries({ queryKey: ["my-threads"] });
      }
    };

    socket.onclose = () => {
      console.log("Notification WebSocket closed");
    };

    socket.onerror = (e) => {
      console.error("WebSocket error:", e);
    };

    return () => {
      socket.close();
    };
  }, [token]);

  return (
    <MessageNotificationContext.Provider value={null}>
      {children}
    </MessageNotificationContext.Provider>
  );
};
