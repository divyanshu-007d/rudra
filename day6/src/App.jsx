// Day 6: React Setup - JSX, Components, Props

import ProfileCard from './ProfileCard.jsx';

function App() {
  // Sample data for profile cards
  const profiles = [
    {
      name: "Alice Johnson",
      role: "Frontend Developer",
      email: "alice@example.com",
      skills: ["React", "JavaScript", "CSS", "HTML"]
    },
    {
      name: "Bob Smith", 
      role: "Backend Developer",
      email: "bob@example.com", 
      skills: ["Node.js", "Express", "MongoDB", "API"]
    },
    {
      name: "Charlie Brown",
      role: "Full Stack Developer", 
      email: "charlie@example.com",
      skills: ["React", "Node.js", "TypeScript", "AWS"]
    }
  ];

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1>🎉 Day 6: React Setup</h1>
        <p>Learning JSX, Components, and Props</p>
        <div style={{ 
          backgroundColor: '#f5f5f5', 
          padding: '15px', 
          borderRadius: '8px',
          margin: '20px 0'
        }}>
          <h3>✅ Topics Covered:</h3>
          <ul style={{ textAlign: 'left', display: 'inline-block' }}>
            <li>Create React app with Vite</li>
            <li>JSX syntax and elements</li>
            <li>React components</li>
            <li>Props and data passing</li>
            <li>Component styling</li>
          </ul>
        </div>
      </header>

      <main>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
          🎯 Mini Task: Profile Card Components
        </h2>
        
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          justifyContent: 'center',
          gap: '20px'
        }}>
          {profiles.map((profile, index) => (
            <ProfileCard
              key={index}
              name={profile.name}
              role={profile.role}
              email={profile.email}
              skills={profile.skills}
            />
          ))}
        </div>

        <div style={{
          textAlign: 'center',
          marginTop: '40px',
          padding: '20px',
          backgroundColor: '#e8f5e8',
          borderRadius: '8px'
        }}>
          <h3>🚀 React Fundamentals Learned!</h3>
          <p>Successfully created reusable Profile Card components with props</p>
          <p>Ready to move on to Day 7: State Management</p>
        </div>
      </main>
    </div>
  );
}

export default App;