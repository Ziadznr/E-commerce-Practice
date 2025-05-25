// Basic imports
const express = require('express');
const router = require('./src/routes/api');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

// Security middleware
const rateLimit = require("express-rate-limit");
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// MongoDB
const mongoose = require('mongoose');

// Global CORS options for API routes (with credentials)
const apiCorsOptions = {
    origin: '*',
    credentials: true,
};

// CORS options for static files (no credentials)
const staticCorsOptions = {
    origin: '*',
    credentials: false,
};

// Enable CORS for API routes only
app.use('/api/v1', cors(apiCorsOptions));

// Helmet with contentSecurityPolicy disabled globally
app.use(helmet({
    contentSecurityPolicy: false,
}));

// Override headers on /uploads to allow cross-origin image loading
app.use('/uploads', (req, res, next) => {
    // Allow cross-origin resource loading
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    // Allow images from React origin and self
    res.setHeader('Content-Security-Policy', "default-src 'self'; img-src 'self' http://localhost:5173 data:;");
    next();
});

// Other security middlewares
app.use(mongoSanitize());
app.use(hpp());

// Body Parser
app.use(bodyParser.json());

// Request rate limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 3000
});
app.use(limiter);

// Cookie parser
app.use(cookieParser());

// MongoDB Connection
async function connectDB() {
    try {
        await mongoose.connect('mongodb://localhost:27017/MernEcommerce', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: true
        });
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('MongoDB Connection Error:', error);
        process.exit(1);
    }
}
connectDB();

// Serve static files from uploads with CORS (no credentials)
app.use('/uploads', cors(staticCorsOptions), express.static(path.join(__dirname, 'uploads')));

// Routing
app.use('/api/v1', router);

// Serve frontend build
app.use(express.static('client/dist'));

// Frontend SPA catch-all route
app.get('*', function(req, res) {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
});

module.exports = app;