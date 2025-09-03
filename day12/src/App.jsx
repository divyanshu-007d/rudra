// Day 12: React + API - Full-Stack To-Do App
import { useState, useEffect } from 'react';
import './App.css';

const API_BASE_URL = 'http://localhost:5000/api';

// TodoItem Component
function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description);

  const handleSave = async () => {
    await onEdit(todo.id, { 
      title: editTitle.trim(), 
      description: editDescription.trim() 
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description);
    setIsEditing(false);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ff4757';
      case 'medium': return '#ffa502';
      case 'low': return '#2ed573';
      default: return '#747d8c';
    }
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-header">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="todo-checkbox"
        />
        <div className="todo-badges">
          <span 
            className="priority-badge"
            style={{ backgroundColor: getPriorityColor(todo.priority) }}
          >
            {todo.priority}
          </span>
          <span className="category-badge">{todo.category}</span>
        </div>
      </div>

      {isEditing ? (
        <div className="edit-form">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="edit-title"
            placeholder="Todo title..."
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="edit-description"
            placeholder="Description..."
            rows="2"
          />
          <div className="edit-actions">
            <button onClick={handleSave} className="save-btn">Save</button>
            <button onClick={handleCancel} className="cancel-btn">Cancel</button>
          </div>
        </div>
      ) : (
        <div className="todo-content">
          <h3 className="todo-title">{todo.title}</h3>
          {todo.description && <p className="todo-description">{todo.description}</p>}
          <div className="todo-meta">
            <small>Created: {new Date(todo.createdAt).toLocaleDateString()}</small>
            {todo.updatedAt !== todo.createdAt && (
              <small>Updated: {new Date(todo.updatedAt).toLocaleDateString()}</small>
            )}
          </div>
        </div>
      )}

      <div className="todo-actions">
        <button 
          onClick={() => setIsEditing(!isEditing)} 
          className="edit-btn"
          disabled={todo.completed}
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
        <button onClick={() => onDelete(todo.id)} className="delete-btn">
          Delete
        </button>
      </div>
    </div>
  );
}

// AddTodo Component
function AddTodo({ onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [category, setCategory] = useState('General');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsLoading(true);
    await onAdd({
      title: title.trim(),
      description: description.trim(),
      priority,
      category
    });
    
    // Reset form
    setTitle('');
    setDescription('');
    setPriority('medium');
    setCategory('General');
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="add-todo-form">
      <h3>➕ Add New Todo</h3>
      <div className="form-row">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done?"
          className="todo-input"
          required
        />
      </div>
      
      <div className="form-row">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add description..."
          className="todo-textarea"
          rows="2"
        />
      </div>
      
      <div className="form-row">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="todo-select"
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
          className="todo-input"
        />
      </div>
      
      <button type="submit" disabled={isLoading || !title.trim()} className="add-btn">
        {isLoading ? 'Adding...' : 'Add Todo'}
      </button>
    </form>
  );
}

// Stats Component
function TodoStats({ stats }) {
  if (!stats) return null;

  return (
    <div className="stats-section">
      <h3>📊 Statistics</h3>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{stats.total}</div>
          <div className="stat-label">Total</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.completed}</div>
          <div className="stat-label">Completed</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.pending}</div>
          <div className="stat-label">Pending</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.completionRate}%</div>
          <div className="stat-label">Complete Rate</div>
        </div>
      </div>
    </div>
  );
}

// Main App Component
function App() {
  const [todos, setTodos] = useState([]);
  const [stats, setStats] = useState(null);
  const [filter, setFilter] = useState('all'); // all, completed, pending
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch todos from API
  const fetchTodos = async () => {
    try {
      setError(null);
      const response = await fetch(`${API_BASE_URL}/todos`);
      const data = await response.json();
      
      if (data.success) {
        setTodos(data.data);
      } else {
        setError('Failed to fetch todos');
      }
    } catch (error) {
      setError('Unable to connect to server. Make sure the backend is running on port 5000.');
      console.error('Fetch error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch statistics
  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/stats`);
      const data = await response.json();
      
      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error('Stats error:', error);
    }
  };

  // Add new todo
  const addTodo = async (todoData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todoData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setTodos(prev => [data.data, ...prev]);
        fetchStats(); // Refresh stats
      } else {
        alert('Failed to add todo: ' + data.message);
      }
    } catch (error) {
      alert('Error adding todo: ' + error.message);
    }
  };

  // Toggle todo completion
  const toggleTodo = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${id}/toggle`, {
        method: 'PATCH',
      });
      
      const data = await response.json();
      
      if (data.success) {
        setTodos(prev => prev.map(todo => 
          todo.id === id ? data.data : todo
        ));
        fetchStats(); // Refresh stats
      }
    } catch (error) {
      alert('Error toggling todo: ' + error.message);
    }
  };

  // Delete todo
  const deleteTodo = async (id) => {
    if (!confirm('Are you sure you want to delete this todo?')) return;
    
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      
      if (data.success) {
        setTodos(prev => prev.filter(todo => todo.id !== id));
        fetchStats(); // Refresh stats
      }
    } catch (error) {
      alert('Error deleting todo: ' + error.message);
    }
  };

  // Edit todo
  const editTodo = async (id, updates) => {
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setTodos(prev => prev.map(todo => 
          todo.id === id ? data.data : todo
        ));
      }
    } catch (error) {
      alert('Error updating todo: ' + error.message);
    }
  };

  // Load data on component mount
  useEffect(() => {
    fetchTodos();
    fetchStats();
  }, []);

  // Filter todos based on selected filter
  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'completed': return todo.completed;
      case 'pending': return !todo.completed;
      default: return true;
    }
  });

  if (isLoading) {
    return (
      <div className="app">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading todos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>✅ Day 12: React + API Integration</h1>
        <p>Full-Stack To-Do App with Node.js Backend</p>
        
        {error && (
          <div className="error-banner">
            <p>⚠️ {error}</p>
            <button onClick={fetchTodos} className="retry-btn">Retry</button>
          </div>
        )}
      </header>

      <main className="app-main">
        <div className="app-grid">
          {/* Left Column: Add Todo & Stats */}
          <div className="sidebar">
            <AddTodo onAdd={addTodo} />
            <TodoStats stats={stats} />
          </div>

          {/* Right Column: Todo List */}
          <div className="todos-section">
            <div className="todos-header">
              <h2>📝 My Todos ({filteredTodos.length})</h2>
              
              <div className="filter-buttons">
                <button 
                  onClick={() => setFilter('all')} 
                  className={filter === 'all' ? 'active' : ''}
                >
                  All
                </button>
                <button 
                  onClick={() => setFilter('pending')} 
                  className={filter === 'pending' ? 'active' : ''}
                >
                  Pending
                </button>
                <button 
                  onClick={() => setFilter('completed')} 
                  className={filter === 'completed' ? 'active' : ''}
                >
                  Completed
                </button>
              </div>
            </div>

            <div className="todos-list">
              {filteredTodos.length === 0 ? (
                <div className="empty-state">
                  <p>🎉 {filter === 'all' ? 'No todos yet!' : `No ${filter} todos!`}</p>
                  {filter === 'all' && <p>Add your first todo above to get started.</p>}
                </div>
              ) : (
                filteredTodos.map(todo => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                    onEdit={editTodo}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <p>🚀 Built with React + Express.js | Fetch API Integration</p>
        <p>Backend: <code>http://localhost:5000</code> | Frontend: <code>http://localhost:5173</code></p>
      </footer>
    </div>
  );
}

export default App;