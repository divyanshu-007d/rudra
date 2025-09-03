# Day 12: React + API Integration

Full-Stack To-Do application connecting React frontend with Node.js backend.

## 🎯 Mini Task: To-Do App (with Node backend)

### Features
- ✅ **Full CRUD Operations**: Create, Read, Update, Delete todos
- ✅ **Fetch + Render Data**: Real-time data from backend API
- ✅ **Add + Delete Functionality**: Interactive todo management
- ✅ **Todo Editing**: In-place editing with save/cancel
- ✅ **Priority System**: High, Medium, Low priority levels
- ✅ **Category Organization**: Organize todos by categories
- ✅ **Statistics Dashboard**: Real-time completion stats
- ✅ **Filtering**: View All, Pending, or Completed todos
- ✅ **Responsive Design**: Works on desktop and mobile

### Topics Covered
- **React Hooks**: useState, useEffect for state management
- **Fetch API**: HTTP requests to backend (GET, POST, PUT, DELETE, PATCH)
- **API Integration**: Connecting frontend to Node.js backend
- **Error Handling**: Network errors and user feedback
- **Real-time Updates**: Sync frontend state with backend data
- **Component Architecture**: Modular React components
- **Form Handling**: Controlled inputs and validation

## 🚀 Quick Start

### Backend (Port 5000)
```bash
# Install dependencies
npm install

# Start backend server
npm run server
```

### Frontend (Port 5173)
```bash
# In another terminal, start frontend
npm run client

# Or run both simultaneously
npm run dev
```

### Access the App
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **API Docs**: http://localhost:5000 (shows all endpoints)

## 📡 API Integration

### Frontend → Backend Communication

#### 1. Fetch All Todos
```javascript
const response = await fetch('http://localhost:5000/api/todos');
const data = await response.json();
```

#### 2. Create New Todo
```javascript
const response = await fetch('http://localhost:5000/api/todos', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title, description, priority, category })
});
```

#### 3. Toggle Completion
```javascript
const response = await fetch(`http://localhost:5000/api/todos/${id}/toggle`, {
  method: 'PATCH'
});
```

#### 4. Update Todo
```javascript
const response = await fetch(`http://localhost:5000/api/todos/${id}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(updates)
});
```

#### 5. Delete Todo
```javascript
const response = await fetch(`http://localhost:5000/api/todos/${id}`, {
  method: 'DELETE'
});
```

## 🎨 Frontend Components

### Main App Component
- State management for todos, stats, filters
- API communication functions
- Loading and error states

### TodoItem Component
- Individual todo display
- In-place editing functionality
- Toggle completion and delete actions

### AddTodo Component
- Form for creating new todos
- Input validation and submission
- Priority and category selection

### TodoStats Component
- Real-time statistics display
- Completion rate calculation
- Priority and category distribution

## 🔧 Key Features

### State Management
```javascript
const [todos, setTodos] = useState([]);
const [stats, setStats] = useState(null);
const [filter, setFilter] = useState('all');
const [isLoading, setIsLoading] = useState(true);
```

### Error Handling
```javascript
try {
  const response = await fetch(API_URL);
  const data = await response.json();
  if (data.success) {
    setTodos(data.data);
  }
} catch (error) {
  setError('Unable to connect to server');
}
```

### Real-time Updates
- Automatic stats refresh after CRUD operations
- Optimistic UI updates
- Error rollback on failed operations

## 📊 Backend API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/todos` | Get all todos (with filtering) |
| GET | `/api/todos/:id` | Get specific todo |
| POST | `/api/todos` | Create new todo |
| PUT | `/api/todos/:id` | Update todo |
| DELETE | `/api/todos/:id` | Delete todo |
| PATCH | `/api/todos/:id/toggle` | Toggle completion |
| GET | `/api/stats` | Get statistics |

## 💾 Data Structure

```javascript
{
  id: 1,
  title: "Learn React + API integration",
  description: "Build full-stack todo app",
  completed: false,
  priority: "high",
  category: "Learning",
  createdAt: "2025-09-03T08:00:00Z",
  updatedAt: "2025-09-03T08:00:00Z"
}
```

## 🎓 Learning Outcomes

- ✅ React state management with hooks
- ✅ HTTP requests with Fetch API
- ✅ Frontend-backend communication
- ✅ Real-time data synchronization
- ✅ Error handling and user feedback
- ✅ Component-based architecture
- ✅ Form handling and validation
- ✅ Responsive CSS design
- ✅ Loading states and UX patterns

## 🔄 Next Steps

Ready for **Day 13: Database Basics** - Connect backend to a real database!