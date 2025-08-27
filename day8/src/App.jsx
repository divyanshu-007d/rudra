// Day 8: Lists & Events - To-Do List

import { useState } from 'react';

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React basics', completed: true },
    { id: 2, text: 'Master useState hook', completed: true },
    { id: 3, text: 'Build to-do list', completed: false }
  ]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial' }}>
      <h1>📝 Day 8: To-Do List</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add new task..."
          style={{ padding: '10px', width: '70%', marginRight: '10px' }}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
        />
        <button 
          onClick={addTodo}
          style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none' }}
        >
          Add
        </button>
      </div>

      <div>
        {todos.map(todo => (
          <div key={todo.id} style={{ 
            display: 'flex', 
            alignItems: 'center', 
            padding: '10px', 
            border: '1px solid #ddd', 
            marginBottom: '5px',
            backgroundColor: todo.completed ? '#f0f0f0' : 'white'
          }}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              style={{ marginRight: '10px' }}
            />
            <span style={{ 
              flex: 1, 
              textDecoration: todo.completed ? 'line-through' : 'none',
              color: todo.completed ? '#666' : 'black'
            }}>
              {todo.text}
            </span>
            <button 
              onClick={() => deleteTodo(todo.id)}
              style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '5px 10px' }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <p>Total: {todos.length} | Completed: {todos.filter(t => t.completed).length}</p>
      </div>
    </div>
  );
}

export default App;