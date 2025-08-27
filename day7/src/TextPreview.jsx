// Day 7: Live Text Preview Component

import { useState } from 'react';

function TextPreview() {
  const [text, setText] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <div style={{
      border: '2px solid #28a745',
      borderRadius: '8px',
      padding: '20px',
      margin: '20px 0'
    }}>
      <h3>📝 Live Text Preview</h3>
      
      {/* Text Input */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          Type your message:
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing to see live preview..."
          style={{
            width: '100%',
            height: '100px',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            fontSize: '16px'
          }}
        />
        <p style={{ color: '#666', fontSize: '14px' }}>
          Characters: {text.length} | Words: {text.trim().split(' ').filter(word => word).length}
        </p>
      </div>

      {/* Form Inputs */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Name:
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '5px'
            }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Email:
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '5px'
            }}
          />
        </div>
      </div>

      {/* Live Preview */}
      <div style={{
        backgroundColor: '#f8f9fa',
        padding: '15px',
        borderRadius: '5px',
        border: '1px solid #dee2e6'
      }}>
        <h4 style={{ margin: '0 0 10px 0' }}>📺 Live Preview:</h4>
        <div style={{
          minHeight: '60px',
          padding: '10px',
          backgroundColor: 'white',
          borderRadius: '5px',
          border: '1px solid #ddd'
        }}>
          {name && <p><strong>From:</strong> {name}</p>}
          {email && <p><strong>Email:</strong> {email}</p>}
          {text && <p><strong>Message:</strong> {text}</p>}
          {!name && !email && !text && (
            <p style={{ color: '#999', fontStyle: 'italic' }}>
              Fill in the fields above to see the preview
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default TextPreview;