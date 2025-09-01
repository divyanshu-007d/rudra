# Day 17 - Real-time Chat App 💬

A modern real-time chat application built with React, Socket.io, and Express featuring:

## ✨ Features

- **Real-time Messaging**: Instant message delivery with Socket.io
- **User Status**: Online/offline indicators and typing status
- **Multiple Rooms**: Join different chat rooms
- **Emoji Support**: Rich emoji picker and reactions
- **File Sharing**: Image and file upload capabilities
- **Message History**: Persistent chat history
- **Responsive Design**: Mobile-first approach

## 🚀 Technologies Used

- React 18 with Hooks
- Socket.io for real-time communication
- Express.js backend server
- Tailwind CSS for styling
- Framer Motion for animations
- Emoji Picker React
- Lucide React icons

## 📦 Installation

```bash
npm install
```

## 🎮 Running the Application

### Start the backend server:
```bash
npm run server
```

### Start the development server:
```bash
npm run dev
```

Visit `http://localhost:5173` to start chatting!

## 🛠️ Socket Events

- **connection** - User connects to chat
- **join_room** - Join a specific chat room
- **send_message** - Send a message
- **typing** - Typing indicator
- **user_status** - Online/offline status
- **disconnect** - User leaves chat

## 🎨 Design Features

- Clean, modern chat interface
- Smooth message animations
- User avatars and status indicators
- Dark/Light theme support
- Mobile-responsive design
- Real-time typing indicators
