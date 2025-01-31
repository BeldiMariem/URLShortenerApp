const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const urlRoutes = require('./src/routes/urlRoutes');
const dotenv = require('dotenv');

if (process.env.NODE_ENV === 'test') {
    dotenv.config({ path: '.env.test' }); // Load .env.test for testing
  } else {
    dotenv.config(); // Load .env for development/production
  }
// Environment variables
const baseUrl = process.env.BASE_URL || 'http://localhost:5000';
const PORT = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/urlshortener';
const isTest = process.env.NODE_ENV === 'test';

// Swagger setup
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'URL Shortener API',
        version: '1.0.0',
        description: 'A simple API to shorten URLs',
    },
    servers: [
        {
            url: baseUrl,
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ['./src/routes/urlRoutes.js'], // Path to the route files that will contain Swagger annotations
};

const swaggerSpec = swaggerJSDoc(options);

// Express app setup
const app = express();

// Middleware
app.use(express.json());

const corsOptions = {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
};
app.use(cors(corsOptions));

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// MongoDB connection
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(`Connected to ${isTest ? 'Test' : 'Main'} Database`))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Routes
app.use('/', urlRoutes);

// Start the server
const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Swagger UI is available at http://localhost:${PORT}/api-docs`);
});

// Graceful shutdown
const closeConnections = async () => {
    console.log('Closing MongoDB connection and Express server...');
    await mongoose.connection.close();
    server.close();
};

// Listen for process termination signals
process.on('SIGTERM', closeConnections);
process.on('SIGINT', closeConnections);

// Export for testing
module.exports = { app, server, closeConnections };