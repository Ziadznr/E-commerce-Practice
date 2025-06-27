// Basic imports
const express = require('express');
const app = express();
const router = require('./src/routes/api');
const path = require('path');
require('dotenv').config();

// Security middleware
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// MongoDB
const mongoose = require('mongoose');

// CORS options
const apiCorsOptions = {
    origin: '*',
    credentials: true,
};

const staticCorsOptions = {
    origin: '*',
    credentials: false,
};

// Middleware
app.use('/api/v1', cors(apiCorsOptions));

app.use(helmet({ contentSecurityPolicy: false }));
app.use(mongoSanitize());
app.use(hpp());
app.use(express.json());
app.use(cookieParser());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 3000
});
app.use(limiter);

// MongoDB Connection
async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: true
        });
        console.log('✅ MongoDB Connected');
    } catch (error) {
        console.error('❌ MongoDB Connection Error:', error);
        process.exit(1);
    }
}
connectDB();

// Custom headers for /uploads
app.use('/uploads', (req, res, next) => {
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    res.setHeader('Content-Security-Policy', "default-src 'self'; img-src 'self' http://localhost:5173 data:;");
    next();
});

// Serve uploaded static files
app.use('/uploads', cors(staticCorsOptions), express.static(path.join(__dirname, 'uploads')));

// Routing
app.use('/api/v1', router);

// Serve frontend build files
app.use(express.static(path.join(__dirname, 'client', 'dist')));

// Catch-all route for SPA
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
});

module.exports = app;
