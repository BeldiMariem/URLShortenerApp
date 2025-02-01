const dotenv = require('dotenv');

if (process.env.NODE_ENV === 'test') {
    dotenv.config({ path: '.env.test' });
} else if (process.env.NODE_ENV === 'production') {
    dotenv.config({ path: '.env.production' });
} else {
    dotenv.config(); 
}

module.exports = {
    PORT: process.env.PORT || 5000,
    MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/urlshortener',
    BASE_URL: process.env.BASE_URL || 'http://localhost:5000',
    CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000',
};
