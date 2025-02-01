const mongoose = require('mongoose');
const { PORT, MONGO_URI, BASE_URL, CORS_ORIGIN } = require('./config');

const connectDB = require('./db');
const app = require('./server');

connectDB();

const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
});




const closeConnections = async () => {
    console.log('Closing MongoDB connection and Express server...');
    await mongoose.connection.close();
    server.close();
};


process.on('SIGTERM', closeConnections);
process.on('SIGINT', closeConnections);

module.exports = { app, server, closeConnections };
