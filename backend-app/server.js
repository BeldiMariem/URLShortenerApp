const express = require('express');
const cors = require('cors');
const urlRoutes = require('./src/routes/urlRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const { PORT, CORS_ORIGIN } = require('./config');

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: CORS_ORIGIN, methods: ['GET', 'POST', 'PUT', 'DELETE'], credentials: true }));

// Routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/', urlRoutes);

module.exports = app;
