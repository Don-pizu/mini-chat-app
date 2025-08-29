//server.js

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, "public"))); // serve frontend

// Track users by room
let users = {}; // { socketId: { username, room } }

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Handle joining a room
  socket.on("joinRoom", (payload) => {

  	// Coerce & sanitize to avoid [object HTMLInputElement]
    const username = String(payload?.username || "").trim();
    const room = String(payload?.room || "").trim();
    if (!username || !room) return;

  
    users[socket.id] = { username, room };
    socket.join(room);

    // Broadcast join event
    socket.broadcast.to(room).emit("chat message", {
      user: "System",
      text: `${username} joined ${room} room`,
    });

    // Send updated user list
    updateRoomUsers(room);
    emitTotalUsers();
  });


  // Handle chat messages
  socket.on("chat message", (msg) => {
    const user = users[socket.id];
    if (user) {
      io.to(user.room).emit("chat message", {
        user: user.username,
        text: String(msg)
      });
    }
  });


  // Handle disconnect
  socket.on("disconnect", () => {
    const user = users[socket.id];
    if (user) {
      const { username, room } = user;
      delete users[socket.id];

      // Broadcast leave event
      io.to(room).emit("chat message", {
        user: "System",
        text: `${username} left ${room} room`,
      });

      // Update user list
      updateRoomUsers(room);
    }
  });


  // Helper: send updated user list
  function updateRoomUsers(room) {
    const usersInRoom = Object.values(users)
      .filter((u) => u.room === room)
      .map((u) => u.username);

    io.to(room).emit("room users", {
      users: usersInRoom,
      count:usersInRoom.length
    });
  }


  // Helper: emit global total users
  function emitTotalUsers() {
      io.emit("total users", Object.keys(users).length);
    };


  // When a user starts typing
  socket.on("typing", () => {
    const user = users[socket.id];
    if (user) {
      socket.broadcast.to(user.room).emit("typing", user.username);
    }
  });


  // When a user stops typing
  socket.on("stop typing", () => {
    const user = users[socket.id];
    if (user) {
      socket.broadcast.to(user.room).emit("stop typing", user.username);
    }
  });

});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});