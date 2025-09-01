// Day 10: Tailwind CSS Setup - Styled Product Card List

const products = [
  { 
    id: 1, 
    name: "MacBook Pro", 
    price: 1299, 
    category: "Laptops", 
    rating: 4.8, 
    image: "💻",
    description: "Powerful laptop for professionals"
  },
  { 
    id: 2, 
    name: "iPhone 15", 
    price: 999, 
    category: "Phones", 
    rating: 4.7, 
    image: "📱",
    description: "Latest smartphone technology"
  },
  { 
    id: 3, 
    name: "AirPods Pro", 
    price: 249, 
    category: "Audio", 
    rating: 4.6, 
    image: "🎧",
    description: "Premium wireless earbuds"
  },
  { 
    id: 4, 
    name: "iPad Air", 
    price: 599, 
    category: "Tablets", 
    rating: 4.5, 
    image: "📱",
    description: "Versatile tablet for creativity"
  },
  { 
    id: 5, 
    name: "Apple Watch", 
    price: 399, 
    category: "Wearables", 
    rating: 4.4, 
    image: "⌚",
    description: "Smart watch for health tracking"
  },
  { 
    id: 6, 
    name: "Mac Studio", 
    price: 1999, 
    category: "Desktops", 
    rating: 4.9, 
    image: "🖥️",
    description: "Professional desktop computer"
  }
];

function ProductCard({ product }) {
  return (
    <div className="product-card group animate-slide-up">
      {/* Product Image */}
      <div className="text-6xl text-center mb-4 transform group-hover:scale-110 transition-transform duration-300">
        {product.image}
      </div>
      
      {/* Category Badge */}
      <div className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full mb-3">
        {product.category}
      </div>
      
      {/* Product Name */}
      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
        {product.name}
      </h3>
      
      {/* Description */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {product.description}
      </p>
      
      {/* Price */}
      <div className="text-3xl font-bold text-blue-600 mb-3">
        ${product.price}
      </div>
      
      {/* Rating */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-1">
          <span className="text-yellow-500">⭐</span>
          <span className="text-gray-700 font-medium">{product.rating}</span>
          <span className="text-gray-500 text-sm">(128 reviews)</span>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex space-x-2">
        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 transform hover:scale-105">
          Add to Cart
        </button>
        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
          ❤️
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen gradient-bg p-8">
      {/* Header Section */}
      <header className="text-center text-white mb-12 animate-fade-in">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          🛍️ Day 10: Tailwind CSS
        </h1>
        
        <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
          <span className="text-lg font-medium">Tailwind CSS Setup & Component Styling</span>
        </div>
        
        <p className="text-xl opacity-90 max-w-2xl mx-auto">
          Beautiful, responsive product cards built with Tailwind CSS utility classes
        </p>
        
        {/* Feature Badges */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <span className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
            ✨ Utility Classes
          </span>
          <span className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
            🎨 Custom Components
          </span>
          <span className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
            📱 Responsive Design
          </span>
          <span className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
            🔄 Smooth Animations
          </span>
        </div>
      </header>

      {/* Products Grid */}
      <main className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          🎯 Mini Task: Styled Product Card List
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {products.map((product, index) => (
            <div 
              key={product.id} 
              className="animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        
        {/* Success Banner */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center text-white border border-white/20">
          <h3 className="text-2xl font-bold mb-4">🎉 Tailwind CSS Mastered!</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl mb-2">⚙️</div>
              <div className="font-semibold">Configuration</div>
              <div className="opacity-80">tailwind.config.js</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl mb-2">🎨</div>
              <div className="font-semibold">Utility Classes</div>
              <div className="opacity-80">Responsive & Interactive</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl mb-2">🧩</div>
              <div className="font-semibold">Components</div>
              <div className="opacity-80">@apply Directive</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-2xl mb-2">✨</div>
              <div className="font-semibold">Animations</div>
              <div className="opacity-80">Custom Keyframes</div>
            </div>
          </div>
          
          <p className="mt-6 text-lg">
            Ready for <strong>Day 11: Backend CRUD</strong> - Full-Stack Integration Phase! 🚀
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;