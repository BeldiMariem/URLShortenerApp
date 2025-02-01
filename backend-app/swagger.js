const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'URL Shortener API',
        version: '1.0.0',
        description: 'A simple API to shorten URLs',
    },
    servers: [
        {
            url: process.env.BASE_URL || 'http://localhost:5000',
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ['./src/routes/urlRoutes.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
