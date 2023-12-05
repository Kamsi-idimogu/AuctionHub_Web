// import {
//   BID_ENPOINT,
//   LISTEN_FOR_BID_ERROR_EVENT,
//   LISTEN_FOR_DECREMENT_BID_EVENT,
//   LISTEN_FOR_EXCEPTION_EVENT,
// } from "@/pages/api/endpoints";
// import io, { Socket } from "socket.io-client";

// let socket: Socket | null = null;

// export function getSocket(): Socket {
//   if (!socket) {
//     // Initialize socket connection
//     socket = io(BID_ENPOINT, {
//       withCredentials: true, // Important for sending cookies
//     });

//     socket.on("connect", () => {
//       console.log("Connected to the server");
//     });

//     socket.on("disconnect", (reason) => {
//       console.log(`Disconnected from the server: ${reason}`);
//     });

//     socket.on(LISTEN_FOR_BID_ERROR_EVENT, (data) => {
//       console.log(data);
//     });

//     socket.on(LISTEN_FOR_EXCEPTION_EVENT, (data) => {
//       console.log(data);
//     });

//     socket.on(LISTEN_FOR_DECREMENT_BID_EVENT, (data) => {
//       console.log(data);
//     });
//   }
//   console.log("socket:", socket);

//   return socket;
// }

// // websocket.ts
// import io, { Socket } from 'socket.io-client';

// const SOCKET_INSTANCE_PROPERTY = '__NEXT_JS_SOCKET_INSTANCE__';

// export function getSocket(): Socket {
//   if (typeof window === 'undefined') {
//     // We're on the server or in a non-browser environment, return a dummy object
//     return {} as Socket;
//   }

//   if (!window[SOCKET_INSTANCE_PROPERTY]) {
//     window[SOCKET_INSTANCE_PROPERTY] = io('http://yourserver.com', {
//       withCredentials: true,
//       // ... other configuration options ...
//     });

//     window[SOCKET_INSTANCE_PROPERTY].on('connect', () => {
//       console.log('WebSocket Connected');
//     });

//     // ... other event listeners ...
//   }

//   return window[SOCKET_INSTANCE_PROPERTY] as Socket;
// }
