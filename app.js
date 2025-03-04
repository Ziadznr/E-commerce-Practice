// Basic import
const express = require('express')
const router = require('./src/routes/api')
const app = new express();
const bodyParser = require('body-parser')

//security middleware
const rateLimit = require("express-rate-limit")
const helmet = require('helmet')
const mongoSenitize = require('express-mongo-sanitize')
const hpp = require('hpp')
const cors = require('cors')

//Database
const mongoose = require('mongoose')

// Security middleware implement
app.use(cors())
app.use(helmet())
app.use(mongoSenitize())
app.use(hpp())

//Body Parser implement
app.use(bodyParser.json())

//Request RateLimit implement
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 3000
})
app.use(limiter)

// Mongodb Database Connection
async function connectDB() {
    try {
        await mongoose.connect('mongodb://localhost:27017/ToDo', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: true
        });
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('MongoDB Connection Error:', error);
        process.exit(1); // Exit the process if unable to connect
    }
}
connectDB()


//Routing Implement
app.use('/api/v1', router)

app.use(express.static('client/dist'))

//Undefined route
app.use('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
})

module.exports = app;