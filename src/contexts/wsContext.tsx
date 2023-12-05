import {
  BID_ENPOINT,
  LISTEN_FOR_BID_ERROR_EVENT,
  LISTEN_FOR_DECREMENT_BID_EVENT,
  LISTEN_FOR_EXCEPTION_EVENT,
} from "@/pages/api/endpoints";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

interface WsProviderProps {
  children: React.ReactNode;
}

interface IWebSocketContext {
  socket: Socket | null;
  connectToSocket: () => void;
  disconnectSocket: () => void;
}

const WebSocketContext = createContext<IWebSocketContext>({
  socket: null,
  connectToSocket: function (): void {
    console.log("Function not implemented.");
  },
  disconnectSocket: function (): void {
    console.log("Function not implemented.");
  },
});

export const useWebSocket = () => useContext(WebSocketContext);

export const WsProvider: React.FC<WsProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [hasConnectedBefore, setHasConnectedBefore] = useState<boolean>(false);

  const connectToSocket = () => {
    if (!socket || !socket.connected) {
      const socket = io(BID_ENPOINT, {
        withCredentials: true, // Important for sending cookies
      });

      socket.on("connect", () => {
        console.log("Connected to the server");
      });

      socket.on("disconnect", (reason) => {
        console.log(`Disconnected from the server: ${reason}`);
      });

      socket.on(LISTEN_FOR_BID_ERROR_EVENT, (data) => {
        console.log("bid_event_error: ", data);
      });

      socket.on(LISTEN_FOR_EXCEPTION_EVENT, (data) => {
        console.log("exception_event_error: ", data);
      });

      socket.on(LISTEN_FOR_DECREMENT_BID_EVENT, (data) => {
        console.log("_decrement_bid_event: ", data);
      });
      setSocket(socket);
      console.log("socket wokring");
    } else {
      console.log("socket not working");
    }
    setHasConnectedBefore(true);
  };

  const disconnectSocket = () => {
    if (socket) {
      console.log("disconnecting socket");
      socket.disconnect();
    }
  };

  return (
    <WebSocketContext.Provider value={{ socket, connectToSocket, disconnectSocket }}>
      {children}
    </WebSocketContext.Provider>
  );
};
