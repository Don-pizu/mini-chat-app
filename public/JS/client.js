
const joinContainer = document.getElementById("join-container");
const usernameInput = document.getElementById("username");
const roomSelect = document.getElementById("room");
const joinBtn = document.getElementById("joinBtn");


// Join room
joinBtn.addEventListener("click", () => {
  const currentUser = usernameInput.value.trim();
  const currentRoom = roomSelect.value;

  if (!currentUser) 
    return alert("Please enter a username");

  // Redirect to room.html with query params
  window.location.href = `room.html?username=${encodeURIComponent(currentUser)}&room=${encodeURIComponent(currentRoom)}`;
  
});

