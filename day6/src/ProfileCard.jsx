// Day 6: Profile Card Component

function ProfileCard({ name, role, email, skills, avatar }) {
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '20px',
      margin: '10px',
      maxWidth: '300px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '15px' }}>
        <img 
          src={avatar || '/api/placeholder/100/100'} 
          alt={`${name}'s avatar`}
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: '#f0f0f0'
          }}
        />
      </div>
      
      <h3 style={{ margin: '0 0 5px 0', textAlign: 'center' }}>{name}</h3>
      <p style={{ margin: '0 0 10px 0', color: '#666', textAlign: 'center' }}>{role}</p>
      <p style={{ margin: '0 0 15px 0', fontSize: '14px', textAlign: 'center' }}>{email}</p>
      
      <div>
        <h4 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>Skills:</h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
          {skills.map((skill, index) => (
            <span
              key={index}
              style={{
                backgroundColor: '#e3f2fd',
                color: '#1976d2',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '12px'
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;