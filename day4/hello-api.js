// Day 4 Mini Task: API returning "Hello, World!"

const http = require('http');

console.log("=== Day 4 Mini Task: Hello World API ===\n");

// Create Hello World API server
const apiServer = http.createServer((req, res) => {
    // Set CORS headers for API
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Parse URL and method
    const url = req.url;
    const method = req.method;
    
    console.log(`📨 ${method} request to: ${url}`);
    
    if (url === '/api/hello' && method === 'GET') {
        // Main Hello World API endpoint
        res.writeHead(200, { 'Content-Type': 'application/json' });
        const response = {
            message: "Hello, World!",
            status: "success",
            timestamp: new Date().toISOString(),
            day: 4,
            task: "Node.js Hello World API"
        };
        res.end(JSON.stringify(response, null, 2));
        
    } else if (url === '/api/hello/custom' && method === 'GET') {
        // Custom greeting endpoint
        res.writeHead(200, { 'Content-Type': 'application/json' });
        const response = {
            message: "Hello from Day 4 of my coding journey! 🚀",
            status: "success",
            author: "Student Developer",
            progress: "Learning Node.js fundamentals"
        };
        res.end(JSON.stringify(response, null, 2));
        
    } else if (url === '/api/status' && method === 'GET') {
        // Server status endpoint
        res.writeHead(200, { 'Content-Type': 'application/json' });
        const response = {
            status: "running",
            uptime: process.uptime(),
            version: process.version,
            platform: process.platform,
            memory: process.memoryUsage()
        };
        res.end(JSON.stringify(response, null, 2));
        
    } else if (url === '/api/student' && method === 'GET') {
        // Student progress endpoint
        res.writeHead(200, { 'Content-Type': 'application/json' });
        const response = {
            student: "Learning Node.js",
            completedDays: ["Day 1", "Day 2", "Day 3"],
            currentDay: "Day 4",
            totalDays: 21,
            skills: ["JavaScript", "Functions", "Arrays", "Objects", "Node.js"],
            nextTopic: "Express.js"
        };
        res.end(JSON.stringify(response, null, 2));
        
    } else if (url === '/' && method === 'GET') {
        // API documentation endpoint
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <h1>🌟 Hello World API - Day 4</h1>
            <h2>Available Endpoints:</h2>
            <ul>
                <li><strong>GET /api/hello</strong> - Basic Hello World message</li>
                <li><strong>GET /api/hello/custom</strong> - Custom greeting</li>
                <li><strong>GET /api/status</strong> - Server status information</li>
                <li><strong>GET /api/student</strong> - Student progress data</li>
            </ul>
            <p>✨ All endpoints return JSON responses</p>
            <p>🎯 Mini Task: Successfully created Hello World API!</p>
        `);
        
    } else {
        // 404 Not Found
        res.writeHead(404, { 'Content-Type': 'application/json' });
        const errorResponse = {
            error: "Not Found",
            message: "The requested endpoint does not exist",
            availableEndpoints: [
                "/api/hello",
                "/api/hello/custom", 
                "/api/status",
                "/api/student"
            ]
        };
        res.end(JSON.stringify(errorResponse, null, 2));
    }
});

const API_PORT = 3001;

apiServer.listen(API_PORT, () => {
    console.log(`🎯 Hello World API is running on http://localhost:${API_PORT}`);
    console.log("📡 API Endpoints available:");
    console.log(`   - GET http://localhost:${API_PORT}/api/hello`);
    console.log(`   - GET http://localhost:${API_PORT}/api/hello/custom`);
    console.log(`   - GET http://localhost:${API_PORT}/api/status`);
    console.log(`   - GET http://localhost:${API_PORT}/api/student`);
    console.log(`   - GET http://localhost:${API_PORT}/ (documentation)`);
    console.log("\n✅ Mini Task Completed: Hello World API is ready!");
    console.log("💡 Press Ctrl+C to stop the server");
});

// Handle API server errors
apiServer.on('error', (err) => {
    console.error('❌ API Server error:', err.message);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 API Server shutting down...');
    apiServer.close(() => {
        console.log('✅ API Server closed');
        process.exit(0);
    });
});