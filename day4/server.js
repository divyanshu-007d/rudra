// Day 4: Node.js Introduction - Basic HTTP Server

const http = require('http');

console.log("=== Day 4: Node.js Introduction ===\n");

console.log("🚀 What is Node.js?");
console.log("Node.js is a JavaScript runtime built on Chrome's V8 engine");
console.log("It allows us to run JavaScript on the server side!\n");

// Create a basic HTTP server
const server = http.createServer((req, res) => {
    // Set response headers
    res.writeHead(200, {
        'Content-Type': 'text/html',
        'Access-Control-Allow-Origin': '*'
    });

    // Handle different routes
    if (req.url === '/') {
        res.write(`
            <h1>🎉 Welcome to Day 4 - Node.js Server!</h1>
            <p>This is my first Node.js HTTP server</p>
            <h2>Available Routes:</h2>
            <ul>
                <li><a href="/about">About</a></li>
                <li><a href="/time">Current Time</a></li>
                <li><a href="/student">Student Info</a></li>
            </ul>
        `);
    } else if (req.url === '/about') {
        res.write(`
            <h1>📚 About This Server</h1>
            <p>Created on Day 4 of the 21-day Full-Stack Journey</p>
            <p>Learning Node.js fundamentals and HTTP servers</p>
            <a href="/">← Back to Home</a>
        `);
    } else if (req.url === '/time') {
        res.write(`
            <h1>⏰ Current Time</h1>
            <p>Server time: ${new Date().toLocaleString()}</p>
            <p>Timestamp: ${Date.now()}</p>
            <a href="/">← Back to Home</a>
        `);
    } else if (req.url === '/student') {
        res.write(`
            <h1>🎓 Student Progress</h1>
            <p>Day 1: ✅ JavaScript Basics</p>
            <p>Day 2: ✅ Functions & Loops</p>
            <p>Day 3: ✅ Arrays & Objects</p>
            <p>Day 4: 🔄 Node.js Introduction</p>
            <a href="/">← Back to Home</a>
        `);
    } else {
        res.writeHead(404);
        res.write(`
            <h1>❌ 404 - Page Not Found</h1>
            <p>The page you're looking for doesn't exist</p>
            <a href="/">← Back to Home</a>
        `);
    }

    res.end();
});

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`🌐 Server is running on http://localhost:${PORT}`);
    console.log("📝 Server started successfully!");
    console.log("🔍 Try visiting these URLs:");
    console.log(`   - http://localhost:${PORT}/`);
    console.log(`   - http://localhost:${PORT}/about`);
    console.log(`   - http://localhost:${PORT}/time`);
    console.log(`   - http://localhost:${PORT}/student`);
    console.log("\n💡 Press Ctrl+C to stop the server");
});

// Handle server errors
server.on('error', (err) => {
    console.error('❌ Server error:', err.message);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 Server shutting down gracefully...');
    server.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
    });
});