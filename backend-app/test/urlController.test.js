const request = require('supertest');
const { app, server, closeConnections } = require('../index');
const mongoose = require('mongoose');
const Url = require('../src/models/Url');

// Load test environment variables
require('dotenv').config({ path: '.env.test' });

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log('Connected to database:', mongoose.connection.name); // Log the database name
}, 10000); 

afterAll(async () => {
    await closeConnections();
}, 10000); 

beforeEach(async () => {
    await Url.deleteMany({});
}, 10000); 

describe('urlController', () => {
    it('should shorten a valid URL', async () => {
        const longUrl = 'https://example.com';

        const response = await request(app)
            .post('/shorten')
            .send({ longUrl })
            .expect(200);

        expect(response.body).toHaveProperty('shortUrl');
        expect(response.body.shortUrl).toMatch(/http:\/\/localhost:5000\/\w+/);

        const url = await Url.findOne({ longUrl });
        expect(url).toBeTruthy();
        expect(url.shortId).toBeDefined();
    });

    it('should return an error for an invalid URL', async () => {
        const longUrl = 'invalid-url';

        const response = await request(app)
            .post('/shorten')
            .send({ longUrl })
            .expect(400);

        expect(response.body).toHaveProperty('error', 'Invalid URL');

        const url = await Url.findOne({ longUrl });
        expect(url).toBeNull(); 
    });

    it('should redirect to the original URL for a valid shortId', async () => {
        const longUrl = 'https://example.com';
        const shortId = 'abc123';

        await Url.create({ longUrl, shortId });

        const response = await request(app)
            .get(`/${shortId}`)
            .expect(302);

        expect(response.headers.location).toBe(longUrl);
    });

    it('should return an error for an invalid shortId', async () => {
        const shortId = 'invalid-short-id';

        const response = await request(app)
            .get(`/${shortId}`)
            .expect(404);

        expect(response.body).toHaveProperty('error', 'URL not found');
    });
});