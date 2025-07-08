import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_SOCKET_SERVER || "http://localhost:3000", {
  withCredentials: true,
  transports: ["websocket"]
});

export default socket;
