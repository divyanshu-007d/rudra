// Day 9: useEffect & Fetch API - Student Directory

import { useState, useEffect } from 'react';

function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock API data (simulating backend)
  const mockStudents = [
    { id: 1, name: "Alice Johnson", course: "Computer Science", grade: "A", email: "alice@example.com" },
    { id: 2, name: "Bob Smith", course: "Mathematics", grade: "B+", email: "bob@example.com" },
    { id: 3, name: "Charlie Brown", course: "Physics", grade: "A-", email: "charlie@example.com" },
    { id: 4, name: "Diana Prince", course: "Chemistry", grade: "A", email: "diana@example.com" }
  ];

  // Simulate API fetch
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setStudents(mockStudents);
        setError(null);
      } catch (err) {
        setError('Failed to fetch students');
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h2>🔄 Loading Student Directory...</h2>
    </div>
  );

  if (error) return (
    <div style={{ textAlign: 'center', padding: '50px', color: 'red' }}>
      <h2>❌ Error: {error}</h2>
    </div>
  );

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial' }}>
      <h1>🎓 Day 9: Student Directory</h1>
      <p>useEffect & Fetch API Demo</p>
      
      <div style={{ display: 'grid', gap: '15px' }}>
        {students.map(student => (
          <div key={student.id} style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '15px',
            backgroundColor: '#f9f9f9'
          }}>
            <h3 style={{ margin: '0 0 10px 0' }}>{student.name}</h3>
            <p><strong>Course:</strong> {student.course}</p>
            <p><strong>Grade:</strong> {student.grade}</p>
            <p><strong>Email:</strong> {student.email}</p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '20px', textAlign: 'center', padding: '15px', backgroundColor: '#e3f2fd' }}>
        <p>✅ Successfully fetched {students.length} students using useEffect!</p>
      </div>
    </div>
  );
}

export default App;