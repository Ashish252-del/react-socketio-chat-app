const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
  

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);
  // send to all connected clients 
  io.emit('admin',"Hey welcom all")
  // currently the connection which is stablished except that this event will emit of all other client 
 socket.broadcast.emit("hello",'One more user entered ');
  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", (arg) => {
    console.log("User Disconnected",arg, socket.id);
  });
});

server.listen(3001, () => {
  console.log("SERVER RUNNING");
});
