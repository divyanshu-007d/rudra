// 🚀 E-commerce Backend Server
// Handles product data, cart operations, and payment processing

import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const PORT = 3001;

// Enable CORS for frontend communication
app.use(cors());
app.use(express.json());

// In-memory storage for demo purposes
// In production, you'd use a proper database
let cart = [];
let orders = [];

// 🛍️ Get all products from FakeStore API
app.get('/api/products', async (req, res) => {
  try {
    const response = await axios.get('https://fakestoreapi.com/products');
    
    // Enhance products with additional data for better UX
    const enhancedProducts = response.data.map(product => ({
      ...product,
      inStock: Math.random() > 0.1, // 90% chance of being in stock
      fastDelivery: Math.random() > 0.5, // 50% chance of fast delivery
      discount: Math.random() > 0.7 ? Math.floor(Math.random() * 30) + 5 : 0, // Random discount
    }));
    
    res.json(enhancedProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// 🎯 Get single product by ID
app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
    
    // Add enhanced data
    const enhancedProduct = {
      ...response.data,
      inStock: Math.random() > 0.1,
      fastDelivery: Math.random() > 0.5,
      discount: Math.random() > 0.7 ? Math.floor(Math.random() * 30) + 5 : 0,
      reviews: Math.floor(Math.random() * 500) + 50, // Random review count
      specifications: [
        'High quality materials',
        'Durable construction',
        'Easy maintenance',
        'Customer satisfaction guaranteed'
      ]
    };
    
    res.json(enhancedProduct);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Product not found' });
  }
});

// 📂 Get product categories
app.get('/api/categories', async (req, res) => {
  try {
    const response = await axios.get('https://fakestoreapi.com/products/categories');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// 🛒 Get products by category
app.get('/api/products/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const response = await axios.get(`https://fakestoreapi.com/products/category/${category}`);
    
    const enhancedProducts = response.data.map(product => ({
      ...product,
      inStock: Math.random() > 0.1,
      fastDelivery: Math.random() > 0.5,
      discount: Math.random() > 0.7 ? Math.floor(Math.random() * 30) + 5 : 0,
    }));
    
    res.json(enhancedProducts);
  } catch (error) {
    console.error('Error fetching category products:', error);
    res.status(500).json({ error: 'Failed to fetch category products' });
  }
});

// 🛒 Cart Management
app.get('/api/cart', (req, res) => {
  res.json(cart);
});

app.post('/api/cart', (req, res) => {
  const { productId, quantity = 1 } = req.body;
  
  // Check if item already exists in cart
  const existingItem = cart.find(item => item.productId === productId);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ 
      id: Date.now(), 
      productId, 
      quantity, 
      addedAt: new Date() 
    });
  }
  
  res.json({ message: 'Item added to cart', cart });
});

app.delete('/api/cart/:id', (req, res) => {
  const { id } = req.params;
  cart = cart.filter(item => item.id !== parseInt(id));
  res.json({ message: 'Item removed from cart', cart });
});

app.put('/api/cart/:id', (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  
  const item = cart.find(item => item.id === parseInt(id));
  if (item) {
    item.quantity = quantity;
    res.json({ message: 'Cart updated', cart });
  } else {
    res.status(404).json({ error: 'Cart item not found' });
  }
});

// 💳 Payment Processing (Mock Stripe Integration)
app.post('/api/checkout', async (req, res) => {
  try {
    const { items, totalAmount, customerInfo } = req.body;
    
    // Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate mock order
    const order = {
      id: `order_${Date.now()}`,
      items,
      totalAmount,
      customerInfo,
      status: 'confirmed',
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      trackingNumber: `TRK${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      createdAt: new Date()
    };
    
    orders.push(order);
    cart = []; // Clear cart after successful payment
    
    res.json({ 
      success: true, 
      order,
      message: 'Payment processed successfully!' 
    });
  } catch (error) {
    console.error('Payment processing error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Payment failed. Please try again.' 
    });
  }
});

// 📦 Get order history
app.get('/api/orders', (req, res) => {
  res.json(orders);
});

// 🔍 Search products
app.get('/api/search', async (req, res) => {
  try {
    const { q } = req.query;
    const response = await axios.get('https://fakestoreapi.com/products');
    
    // Filter products based on search query
    const filteredProducts = response.data.filter(product =>
      product.title.toLowerCase().includes(q.toLowerCase()) ||
      product.description.toLowerCase().includes(q.toLowerCase()) ||
      product.category.toLowerCase().includes(q.toLowerCase())
    );
    
    const enhancedProducts = filteredProducts.map(product => ({
      ...product,
      inStock: Math.random() > 0.1,
      fastDelivery: Math.random() > 0.5,
      discount: Math.random() > 0.7 ? Math.floor(Math.random() * 30) + 5 : 0,
    }));
    
    res.json(enhancedProducts);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Search failed' });
  }
});

// 🚀 Start server
app.listen(PORT, () => {
  console.log(`🛒 E-commerce server running on port ${PORT}`);
  console.log(`📝 API endpoints available at http://localhost:${PORT}/api`);
});
