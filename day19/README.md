# Day 19 - Social Media Dashboard 📱

A modern social media platform with user interactions featuring:

## ✨ Features

- **User Profiles**: Customizable user profiles with photos and bio
- **Posts & Comments**: Create posts with images and engage with comments
- **Like System**: Like posts and comments with real-time updates
- **Follow System**: Follow other users and see their posts in feed
- **Real-time Notifications**: Get notified of likes, comments, and follows
- **Image Upload**: Share photos and media
- **Activity Feed**: Personalized feed based on following

## 🚀 Technologies Used

- React 18 with Hooks
- React Router for navigation
- Socket.io for real-time features
- Express.js with Multer for file uploads
- Tailwind CSS for styling
- Framer Motion for animations
- Axios for API calls

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

Visit `http://localhost:5173` to start socializing!

## 🛠️ API Endpoints

- **POST /api/posts** - Create a new post
- **GET /api/posts** - Get all posts
- **POST /api/posts/:id/like** - Like/unlike a post
- **POST /api/posts/:id/comment** - Add comment to post
- **GET /api/users/:id/profile** - Get user profile
- **POST /api/users/follow** - Follow/unfollow user

## 🎨 Design Features

- Instagram-inspired interface
- Real-time likes and comments
- Smooth animations and transitions
- Mobile-responsive design
- Dark/Light theme support
- Infinite scroll feed
