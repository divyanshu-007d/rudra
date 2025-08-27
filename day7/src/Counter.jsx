// Day 7: Counter Component with useState

import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div style={{
      border: '2px solid #007bff',
      borderRadius: '8px',
      padding: '20px',
      textAlign: 'center',
      margin: '20px 0'
    }}>
      <h3>🔢 Counter Component</h3>
      <div style={{ fontSize: '48px', margin: '20px 0', color: '#007bff' }}>
        {count}
      </div>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button 
          onClick={() => setCount(count - 1)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          -1
        </button>
        <button 
          onClick={() => setCount(0)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Reset
        </button>
        <button 
          onClick={() => setCount(count + 1)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          +1
        </button>
      </div>
      <p style={{ marginTop: '15px', color: '#666' }}>
        Current count: {count} | 
        Status: {count === 0 ? 'Zero' : count > 0 ? 'Positive' : 'Negative'}
      </p>
    </div>
  );
}

export default Counter;