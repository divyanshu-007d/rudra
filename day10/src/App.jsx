// Day 10: Styling - Product Card List

const products = [
  { id: 1, name: "MacBook Pro", price: 1299, category: "Laptops", rating: 4.8, image: "💻" },
  { id: 2, name: "iPhone 15", price: 999, category: "Phones", rating: 4.7, image: "📱" },
  { id: 3, name: "AirPods Pro", price: 249, category: "Audio", rating: 4.6, image: "🎧" },
  { id: 4, name: "iPad Air", price: 599, category: "Tablets", rating: 4.5, image: "📱" }
];

function ProductCard({ product }) {
  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    border: '1px solid #e2e8f0',
    cursor: 'pointer'
  };

  const imageStyle = {
    fontSize: '48px',
    textAlign: 'center',
    marginBottom: '15px'
  };

  const titleStyle = {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '8px',
    color: '#1a202c'
  };

  const priceStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#2b6cb0',
    marginBottom: '8px'
  };

  const categoryStyle = {
    fontSize: '14px',
    color: '#718096',
    marginBottom: '12px'
  };

  const ratingStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    color: '#ed8936'
  };

  return (
    <div 
      style={cardStyle}
      onMouseEnter={(e) => {
        e.target.style.transform = 'translateY(-2px)';
        e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
      }}
    >
      <div style={imageStyle}>{product.image}</div>
      <h3 style={titleStyle}>{product.name}</h3>
      <div style={priceStyle}>${product.price}</div>
      <div style={categoryStyle}>{product.category}</div>
      <div style={ratingStyle}>
        <span>⭐</span>
        <span>{product.rating}</span>
      </div>
    </div>
  );
}

function App() {
  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '40px 20px',
    fontFamily: 'system-ui, -apple-system, sans-serif'
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '40px',
    color: 'white'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const badgeStyle = {
    display: 'inline-block',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '14px',
    marginBottom: '20px'
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={{ fontSize: '48px', margin: '0 0 10px 0' }}>🛍️ Day 10: Styled Products</h1>
        <div style={badgeStyle}>Component-based Styling</div>
        <p style={{ fontSize: '18px', opacity: 0.9 }}>Beautiful product cards with hover effects</p>
      </div>
      
      <div style={gridStyle}>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div style={{ 
        textAlign: 'center', 
        marginTop: '40px', 
        color: 'white',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        padding: '20px',
        borderRadius: '12px',
        maxWidth: '600px',
        margin: '40px auto 0'
      }}>
        <h3>✅ Styling Mastered!</h3>
        <p>CSS-in-JS • Hover Effects • Responsive Grid • Gradients</p>
      </div>
    </div>
  );
}

export default App;