//server.js

const express = require("express"); 
const http = require("http"); 
const { Server } = require("socket.io"); 
const path = require("path");

const app = express(); 
const server = http.createServer(app); 
const io = new Server(server); 


// Serve everything in the public folder (client.js, CSS, etc.)
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => { 
	res.sendFile(__dirname + "/public/index.html"); 
}); 


io.on("connection", (socket) => { 
	console.log("A user connected"); 

	// Listen for messages from client 
	socket.on("chat message", (msg) => { 
		console.log("Message: " + msg); 

		// Broadcast message to everyone 
		io.emit("chat message", msg); 
	}); 

	socket.on("disconnect", () => { 
		console.log("User disconnected"); 
	}); 
}); 

server.listen(3000, () => { 
	console.log("Server running on http://localhost:3000");
});