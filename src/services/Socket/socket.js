import {io} from "socket.io-client"
export const socket = io("http://localhost:3000"); // replace with your actual server URL



socket.on("connect", () => {
    console.log("Socket connected:", socket.id);
  });
  
  socket.on("disconnect", () => {
    console.log("Socket disconnected");
  });