// 💬 Real-time Chat Server with Socket.io
// Handles real-time messaging, user status, and room management

import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

const PORT = 3001;

// Enable CORS
app.use(cors());
app.use(express.json());

// 📊 In-memory storage for demo (use database in production)
let users = new Map(); // userId -> { id, name, avatar, room, status }
let rooms = new Map(); // roomId -> { name, users: Set, messages: [] }
let messageHistory = new Map(); // roomId -> messages array

// 🏠 Initialize default rooms
const defaultRooms = [
  { id: 'general', name: 'General Chat', description: 'General discussion' },
  { id: 'tech', name: 'Tech Talk', description: 'Technology discussions' },
  { id: 'random', name: 'Random', description: 'Random conversations' }
];

defaultRooms.forEach(room => {
  rooms.set(room.id, {
    ...room,
    users: new Set(),
    messages: []
  });
  messageHistory.set(room.id, []);
});

// 🔌 Socket.io connection handling
io.on('connection', (socket) => {
  console.log(`🔗 User connected: ${socket.id}`);

  // 👤 User joins the chat
  socket.on('join_chat', (userData) => {
    const user = {
      id: socket.id,
      socketId: socket.id,
      name: userData.name || `User${Math.floor(Math.random() * 1000)}`,
      avatar: userData.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name || 'User')}&background=0ea5e9&color=fff`,
      room: null,
      status: 'online',
      joinedAt: new Date()
    };
    
    users.set(socket.id, user);
    
    // Send user info back
    socket.emit('user_joined', user);
    
    // Send available rooms
    const roomsList = Array.from(rooms.values()).map(room => ({
      id: room.id,
      name: room.name,
      description: room.description,
      userCount: room.users.size
    }));
    
    socket.emit('rooms_list', roomsList);
    
    console.log(`👤 ${user.name} joined the chat`);
  });

  // 🏠 User joins a specific room
  socket.on('join_room', (roomId) => {
    const user = users.get(socket.id);
    if (!user) return;

    // Leave previous room if any
    if (user.room) {
      socket.leave(user.room);
      const prevRoom = rooms.get(user.room);
      if (prevRoom) {
        prevRoom.users.delete(socket.id);
        socket.to(user.room).emit('user_left', {
          userId: socket.id,
          userName: user.name,
          userCount: prevRoom.users.size
        });
      }
    }

    // Join new room
    const room = rooms.get(roomId);
    if (room) {
      socket.join(roomId);
      room.users.add(socket.id);
      user.room = roomId;
      users.set(socket.id, user);

      // Send room info to user
      socket.emit('joined_room', {
        roomId,
        roomName: room.name,
        messages: room.messages.slice(-50) // Last 50 messages
      });

      // Get room users
      const roomUsers = Array.from(room.users).map(userId => users.get(userId)).filter(Boolean);
      
      // Notify room about new user
      socket.to(roomId).emit('user_joined_room', {
        user: {
          id: user.id,
          name: user.name,
          avatar: user.avatar
        },
        userCount: room.users.size
      });

      // Send updated user list to room
      io.to(roomId).emit('room_users', roomUsers);
      
      console.log(`🏠 ${user.name} joined room: ${room.name}`);
    }
  });

  // 💬 Handle new message
  socket.on('send_message', (messageData) => {
    const user = users.get(socket.id);
    if (!user || !user.room) return;

    const message = {
      id: Date.now() + Math.random(),
      text: messageData.text,
      user: {
        id: user.id,
        name: user.name,
        avatar: user.avatar
      },
      timestamp: new Date(),
      type: messageData.type || 'text',
      reactions: {}
    };

    // Add message to room
    const room = rooms.get(user.room);
    if (room) {
      room.messages.push(message);
      
      // Keep only last 100 messages in memory
      if (room.messages.length > 100) {
        room.messages = room.messages.slice(-100);
      }

      // Broadcast message to all users in room
      io.to(user.room).emit('new_message', message);
      
      console.log(`💬 Message from ${user.name} in ${room.name}: ${message.text.substring(0, 50)}...`);
    }
  });

  // ⌨️ Typing indicator
  socket.on('typing_start', () => {
    const user = users.get(socket.id);
    if (!user || !user.room) return;

    socket.to(user.room).emit('user_typing', {
      userId: user.id,
      userName: user.name
    });
  });

  socket.on('typing_stop', () => {
    const user = users.get(socket.id);
    if (!user || !user.room) return;

    socket.to(user.room).emit('user_stop_typing', {
      userId: user.id,
      userName: user.name
    });
  });

  // 😀 Message reactions
  socket.on('react_message', (data) => {
    const user = users.get(socket.id);
    if (!user || !user.room) return;

    const room = rooms.get(user.room);
    if (!room) return;

    const message = room.messages.find(msg => msg.id === data.messageId);
    if (message) {
      if (!message.reactions[data.emoji]) {
        message.reactions[data.emoji] = [];
      }
      
      // Toggle reaction
      const userIndex = message.reactions[data.emoji].findIndex(u => u.id === user.id);
      if (userIndex > -1) {
        message.reactions[data.emoji].splice(userIndex, 1);
        if (message.reactions[data.emoji].length === 0) {
          delete message.reactions[data.emoji];
        }
      } else {
        message.reactions[data.emoji].push({
          id: user.id,
          name: user.name
        });
      }

      io.to(user.room).emit('message_reaction', {
        messageId: data.messageId,
        reactions: message.reactions
      });
    }
  });

  // 📸 File upload (placeholder)
  socket.on('upload_file', (fileData) => {
    const user = users.get(socket.id);
    if (!user || !user.room) return;

    // In a real app, you'd upload to cloud storage
    const message = {
      id: Date.now() + Math.random(),
      text: fileData.name,
      user: {
        id: user.id,
        name: user.name,
        avatar: user.avatar
      },
      timestamp: new Date(),
      type: 'file',
      fileData: {
        name: fileData.name,
        size: fileData.size,
        type: fileData.type,
        url: fileData.url // This would be the cloud storage URL
      }
    };

    const room = rooms.get(user.room);
    if (room) {
      room.messages.push(message);
      io.to(user.room).emit('new_message', message);
    }
  });

  // 📤 User disconnection
  socket.on('disconnect', () => {
    const user = users.get(socket.id);
    
    if (user) {
      // Remove user from room
      if (user.room) {
        const room = rooms.get(user.room);
        if (room) {
          room.users.delete(socket.id);
          
          // Notify room users
          socket.to(user.room).emit('user_left', {
            userId: socket.id,
            userName: user.name,
            userCount: room.users.size
          });

          // Send updated user list
          const roomUsers = Array.from(room.users).map(userId => users.get(userId)).filter(Boolean);
          io.to(user.room).emit('room_users', roomUsers);
        }
      }

      // Remove user from users map
      users.delete(socket.id);
      
      console.log(`👋 ${user.name} disconnected`);
    }
  });

  // 🔄 Get room list
  socket.on('get_rooms', () => {
    const roomsList = Array.from(rooms.values()).map(room => ({
      id: room.id,
      name: room.name,
      description: room.description,
      userCount: room.users.size
    }));
    
    socket.emit('rooms_list', roomsList);
  });

  // 👥 Get users in current room
  socket.on('get_room_users', () => {
    const user = users.get(socket.id);
    if (!user || !user.room) return;

    const room = rooms.get(user.room);
    if (room) {
      const roomUsers = Array.from(room.users).map(userId => users.get(userId)).filter(Boolean);
      socket.emit('room_users', roomUsers);
    }
  });
});

// 📊 API endpoints for chat statistics
app.get('/api/stats', (req, res) => {
  const stats = {
    totalUsers: users.size,
    totalRooms: rooms.size,
    totalMessages: Array.from(rooms.values()).reduce((total, room) => total + room.messages.length, 0),
    roomStats: Array.from(rooms.entries()).map(([id, room]) => ({
      id,
      name: room.name,
      users: room.users.size,
      messages: room.messages.length
    }))
  };
  
  res.json(stats);
});

// 🚀 Start server
server.listen(PORT, () => {
  console.log(`💬 Chat server running on port ${PORT}`);
  console.log(`📊 Socket.io server ready for real-time connections`);
  console.log(`🏠 ${rooms.size} default rooms created`);
});
