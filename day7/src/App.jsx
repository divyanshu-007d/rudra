// Day 7: State Management - useState and Handling Inputs

import { useState } from 'react';
import Counter from './Counter.jsx';
import TextPreview from './TextPreview.jsx';

function App() {
  const [showComponents, setShowComponents] = useState(true);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1>🎯 Day 7: State Management</h1>
        <p>Learning useState and Handling Inputs</p>
        
        <div style={{ 
          backgroundColor: '#e3f2fd', 
          padding: '15px', 
          borderRadius: '8px',
          margin: '20px 0'
        }}>
          <h3>✅ Topics Covered:</h3>
          <ul style={{ textAlign: 'left', display: 'inline-block' }}>
            <li>useState hook for state management</li>
            <li>Handling form inputs and events</li>
            <li>Live text preview functionality</li>
            <li>Counter with increment/decrement</li>
            <li>Real-time state updates</li>
          </ul>
        </div>

        <button
          onClick={() => setShowComponents(!showComponents)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginBottom: '20px'
          }}
        >
          {showComponents ? 'Hide' : 'Show'} Components
        </button>
      </header>

      {showComponents && (
        <main>
          <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
            🎯 Mini Tasks: Counter + Live Text Preview
          </h2>
          
          <Counter />
          <TextPreview />

          <div style={{
            textAlign: 'center',
            marginTop: '40px',
            padding: '20px',
            backgroundColor: '#d4edda',
            borderRadius: '8px',
            border: '1px solid #c3e6cb'
          }}>
            <h3>🚀 State Management Mastered!</h3>
            <p>Successfully implemented useState for interactive components</p>
            <p>✅ Counter with state updates</p>
            <p>✅ Live text preview with form handling</p>
            <p>Ready for Day 8: Lists & Events</p>
          </div>
        </main>
      )}
    </div>
  );
}

export default App;