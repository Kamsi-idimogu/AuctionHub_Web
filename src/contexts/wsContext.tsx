import {
  BID_ENPOINT,
  LISTEN_FOR_BID_ERROR_EVENT,
  LISTEN_FOR_DECREMENT_BID_EVENT,
  LISTEN_FOR_EXCEPTION_EVENT,
} from "@/pages/api/endpoints";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

interface WsProviderProps {
  children: React.ReactNode;
}

interface IWebSocketContext {
  getSocket: () => Socket | null;
  connectToSocket: () => Socket | null;
  disconnectSocket: () => void;
}

const WebSocketContext = createContext<IWebSocketContext>({
  getSocket: function (): Socket | null {
    return null;
  },
  connectToSocket: function (): Socket | null {
    console.log("Function not implemented.");
    return null;
  },
  disconnectSocket: function (): void {
    console.log("Function not implemented.");
  },
});

export const useWebSocket = () => useContext(WebSocketContext);

export const WsProvider: React.FC<WsProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [hasConnectedBefore, setHasConnectedBefore] = useState<boolean>(false);

  const connectToSocket = useCallback((): Socket | null => {
    if (!socket || !socket.connected) {
      const newSocket = io(BID_ENPOINT, {
        withCredentials: true, // Important for sending cookies
      });

      newSocket.on("connect", () => {
        console.log("Connected to the server");
      });

      newSocket.on("disconnect", (reason) => {
        console.log(`Disconnected from the server: ${reason}`);
      });

      newSocket.on(LISTEN_FOR_BID_ERROR_EVENT, (data) => {
        console.log("bid_event_error: ", data);
      });

      newSocket.on(LISTEN_FOR_EXCEPTION_EVENT, (data) => {
        console.log("exception_event_error: ", data);
      });

      newSocket.on(LISTEN_FOR_DECREMENT_BID_EVENT, (data) => {
        console.log("_decrement_bid_event: ", data);
      });
      setSocket(socket);
      // console.log("socket wokring");
      return newSocket;
    } else {
      console.log("socket not working");
    }
    setHasConnectedBefore(true);
    return socket;
  }, [socket]);

  const getSocket = (): Socket | null => {
    return socket;
  };

  const disconnectSocket = useCallback(() => {
    if (socket) {
      console.log("disconnecting socket");
      socket.disconnect();
    }
  }, [socket]);

  return (
    <WebSocketContext.Provider value={{ getSocket, connectToSocket, disconnectSocket }}>
      {children}
    </WebSocketContext.Provider>
  );
};
