# Title
Mini Chat App

## Description
 Real-time chat app using Socket.IO.

 From the **index page**, users can:
- Enter a **username**
- Select a **room** to join  

Once inside a room, they can:
- **Chat with other users in real-time**
- **See who is online**
- **Know when someone is typing**
- **Logout** when finished  

## Features
-Real-time messaging powered by **Socket.IO**
- Username and room selection
- Multiple chat rooms support
- Simple & responsive UI
- Display total number of users online (per room)
- Typing indicator (shows when a user is typing)


## Installation & Usage instructions\
'''bash
git clone https://github.com/Don-pizu/mini-chat-app.git

## Move into the project directory
cd mini-chat-app

## Install dependencies
npm install

## Start the server
node server.js


project-root/
├── public/
│   ├── CSS/
│   │   └── style.css
│   ├── JS/
│   │   ├── client.js
│   │   └── room.js
│   ├── index.html
│   └── room.html
├── server.js
├── .gitignore
├── README.md


## Technologies used
-Node.js

-Express.js

-Socket.IO

-Path

-HTTP

## Author name

-Asiru Adedolapo

## Stage, Commit, and Push**

```bash
git add .
git commit -m "feat: initial project setup with folder structure and README"
git branch -M main
git remote add origin https://github.com/Don-pizu/simple-chat-app.git
git push -u origin main
git commit -m "feat: mini chat app frontend and backend with username, room selection, user list and logout function
"

git commit -m "Feat: added typing indicator, total number of online users and updated README"