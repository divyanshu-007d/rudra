// 🛍️ Products Page Component
// Browse all products with filtering, sorting, and search functionality

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Filter, 
  Grid, 
  List, 
  Star, 
  Heart, 
  ShoppingCart,
  ChevronDown,
  X
} from 'lucide-react';
import axios from 'axios';
import { useCart } from '../contexts/CartContext';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [sortBy, setSortBy] = useState('name');
  const [filterCategory, setFilterCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [showFilters, setShowFilters] = useState(false);
  
  const { addToCart } = useCart();
  const location = useLocation();

  // 📥 Fetch products and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Get URL search params
        const urlParams = new URLSearchParams(location.search);
        const categoryParam = urlParams.get('category');
        const searchParam = urlParams.get('search');

        let productsRes;
        
        // Fetch based on URL parameters
        if (searchParam) {
          productsRes = await axios.get(`/api/search?q=${searchParam}`);
        } else if (categoryParam) {
          productsRes = await axios.get(`/api/products/category/${categoryParam}`);
          setFilterCategory(categoryParam);
        } else {
          productsRes = await axios.get('/api/products');
        }

        const categoriesRes = await axios.get('/api/categories');
        
        setProducts(productsRes.data);
        setFilteredProducts(productsRes.data);
        setCategories(categoriesRes.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        if (window.toast) {
          window.toast.error('Failed to load products');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location.search]);

  // 🔄 Apply filters and sorting when dependencies change
  useEffect(() => {
    let filtered = [...products];

    // Category filter
    if (filterCategory !== 'all') {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === filterCategory.toLowerCase()
      );
    }

    // Price range filter
    filtered = filtered.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      default:
        filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    setFilteredProducts(filtered);
  }, [products, filterCategory, priceRange, sortBy]);

  // 🛒 Add product to cart
  const handleAddToCart = async (product) => {
    const result = await addToCart(product.id, 1);
    if (result.success && window.toast) {
      window.toast.success(result.message);
    }
  };

  // 🎬 Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* 📊 Header with filters and view controls */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
            
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {filterCategory !== 'all' ? 
                  `${filterCategory.charAt(0).toUpperCase() + filterCategory.slice(1)} Products` : 
                  'All Products'
                }
              </h1>
              <p className="text-gray-600">
                {loading ? 'Loading...' : `${filteredProducts.length} products found`}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              
              {/* 🎛️ Sort dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="name">Sort by Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest First</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* 📱 View mode toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-white shadow-sm text-primary-600' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list' 
                      ? 'bg-white shadow-sm text-primary-600' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* 🔧 Filter toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="btn-outline inline-flex items-center space-x-2"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* 🔧 Filters Sidebar */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, x: -300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                className="lg:w-64 bg-white rounded-lg shadow-sm p-6 h-fit"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Filters</h3>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="lg:hidden p-1 hover:bg-gray-100 rounded"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* 📂 Category Filter */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Category</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value="all"
                        checked={filterCategory === 'all'}
                        onChange={(e) => setFilterCategory(e.target.value)}
                        className="text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm">All Categories</span>
                    </label>
                    {categories.map(category => (
                      <label key={category} className="flex items-center">
                        <input
                          type="radio"
                          name="category"
                          value={category}
                          checked={filterCategory === category}
                          onChange={(e) => setFilterCategory(e.target.value)}
                          className="text-primary-600 focus:ring-primary-500"
                        />
                        <span className="ml-2 text-sm capitalize">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 💰 Price Range Filter */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Price Range</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <input
                        type="range"
                        min="0"
                        max="1000"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                        className="flex-1"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="range"
                        min="0"
                        max="1000"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                        className="flex-1"
                      />
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* 🔄 Reset Filters */}
                <button
                  onClick={() => {
                    setFilterCategory('all');
                    setPriceRange([0, 1000]);
                  }}
                  className="w-full btn-outline text-sm"
                >
                  Reset Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 🛍️ Products Grid/List */}
          <div className="flex-1">
            {loading ? (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                  : 'grid-cols-1'
              }`}>
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="loading-skeleton h-80 rounded-lg" />
                ))}
              </div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className={`grid gap-6 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                    : 'grid-cols-1'
                }`}
              >
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    variants={itemVariants}
                    layout
                    className={`product-card group ${
                      viewMode === 'list' ? 'flex flex-row' : ''
                    }`}
                  >
                    <div className={`relative ${
                      viewMode === 'list' ? 'w-48 flex-shrink-0' : ''
                    }`}>
                      <Link to={`/products/${product.id}`}>
                        <img
                          src={product.image}
                          alt={product.title}
                          className={`${
                            viewMode === 'list' 
                              ? 'w-full h-48 object-cover rounded-l-xl' 
                              : 'product-image rounded-t-xl'
                          }`}
                        />
                      </Link>
                      
                      {product.discount > 0 && (
                        <span className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                          -{product.discount}%
                        </span>
                      )}

                      <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-red-50 transition-colors">
                        <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
                      </button>
                    </div>

                    <div className={`p-4 flex-1 ${
                      viewMode === 'list' ? 'flex flex-col justify-between' : ''
                    }`}>
                      <div>
                        <Link to={`/products/${product.id}`}>
                          <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                            {product.title}
                          </h3>
                        </Link>
                        
                        {viewMode === 'list' && (
                          <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                            {product.description}
                          </p>
                        )}

                        <div className="flex items-center space-x-1 mb-3">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(product.rating?.rate || 4) 
                                  ? 'text-yellow-400 fill-current' 
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                          <span className="text-sm text-gray-500 ml-1">
                            ({product.rating?.count || 0})
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {product.discount > 0 ? (
                            <>
                              <span className="text-lg font-bold text-primary-600">
                                ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                              </span>
                              <span className="text-sm text-gray-500 line-through">
                                ${product.price}
                              </span>
                            </>
                          ) : (
                            <span className="text-lg font-bold text-primary-600">
                              ${product.price}
                            </span>
                          )}
                        </div>

                        <button
                          onClick={() => handleAddToCart(product)}
                          className="btn-primary p-2 flex items-center justify-center"
                          title="Add to cart"
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </button>
                      </div>

                      {product.inStock ? (
                        <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full inline-block mt-2">
                          In Stock
                        </span>
                      ) : (
                        <span className="text-xs text-red-600 bg-red-100 px-2 py-1 rounded-full inline-block mt-2">
                          Out of Stock
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* 🔍 No products found */}
            {!loading && filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Filter className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters or search terms</p>
                <button
                  onClick={() => {
                    setFilterCategory('all');
                    setPriceRange([0, 1000]);
                  }}
                  className="btn-primary"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
