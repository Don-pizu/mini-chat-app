const socket = io();

const chatContainer = document.getElementById("chat-container");

const chatForm = document.getElementById("chatForm");
const messageInput = document.getElementById("messageInput");
const messages = document.getElementById("messages");
const usersList = document.getElementById("users");
const logoutBtn = document.getElementById("logoutBtn");
const titleRoom = document.getElementById("titleRoom");
const roomNameEl = document.getElementById("room-name");
const typingIndicator = document.getElementById("typingIndicator");
const totalUsers = document.getElementById("totalUsers");

// Parse query params
const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get("username");
const room = urlParams.get("room");


// If username or room is missing, go back to index
if (!username || !room) {
  window.location.href = "index.html";
}

// Update the room name in the sidebar
if (roomNameEl) {
  roomNameEl.textContent = `Users in ${room} Room`;
}


//Update title based on room
  titleRoom.textContent = `${room} Room`;

// Show chat container once loaded
chatContainer.classList.remove("hidden");

// Join the room
socket.emit("joinRoom", { username, room });

// Send message
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const msg = messageInput.value;
  socket.emit("chat message", msg);
  messageInput.value = "";
});

// Receive chat message
socket.on("chat message", (msg) => {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `<strong>${msg.user}:</strong> ${msg.text}`;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
});


// Detect typing when a using is typing
let typingTimeout;
messageInput.addEventListener("input", () => {
  if (messageInput.value) {
    socket.emit("typing");

    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
      socket.emit("stop typing");
    }, 5000); // 5s after last keypress
  } else {
    socket.emit("stop typing");
  }
});


// Listen for typing events
socket.on("typing", (username) => {
  typingIndicator.style.display = "block";
  typingIndicator.innerText = `${username} is typing...`;
});

socket.on("stop typing", (username) => {
  typingIndicator.innerText = "";
  typingIndicator.style.display = "none";
});



// Update user list
socket.on("room users", ({ users, count}) => {
  usersList.innerHTML = "";
  users.forEach((user) => {
    const li = document.createElement("li");
    li.textContent = user;
    usersList.appendChild(li);
  });
  // show total users

  totalUsers.textContent = `Total online users: ${count}`;
});


//handle logout
// Logout helper 
function logout() { 
  window.location.href = 'index.html'; 
} 

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', logout);
  }
});
