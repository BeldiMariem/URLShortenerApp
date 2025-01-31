require('dotenv').config({ path: '.env.test' }); // Load test environment variables
const mongoose = require('mongoose');
const urlService = require('../src/services/urlService');
const Url = require('../src/models/Url'); // Adjust the path as needed

beforeAll(async () => {
    
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}, 10000); 
afterAll(async () => {
    await mongoose.connection.close();
}, 10000); 

beforeEach(async () => {
    await Url.deleteMany({});
}, 10000); 

describe('urlService', () => {
    it('should shorten a valid URL', async () => {
        const longUrl = 'https://example.com';
        const result = await urlService.createShortenedUrl(longUrl);

        const baseUrl = process.env.BASE_URL || 'http://localhost:5000';
        expect(result).toHaveProperty('shortUrl');
        expect(result.shortUrl).toMatch(new RegExp(`${baseUrl}/\\w+`));

        const url = await Url.findOne({ longUrl });
        expect(url).toBeTruthy();
        expect(url.shortId).toBeDefined();
        expect(url.longUrl).toBe(longUrl);
    });

    it('should throw an error for an invalid URL', async () => {
        const longUrl = 'invalid-url';

        await expect(urlService.createShortenedUrl(longUrl)).rejects.toThrow('Invalid URL');

        const url = await Url.findOne({ longUrl });
        expect(url).toBeNull();
    });

    it('should return the original URL for a valid shortId', async () => {
        const longUrl = 'https://example.com';
        const shortId = 'short';

        await Url.create({ longUrl, shortId });

        const result = await urlService.redirectUrl(shortId);
        expect(result).toBe(longUrl);
    });

    it('should throw an error for an invalid shortId', async () => {
        const shortId = 'invalid-short-id';

        await expect(urlService.redirectUrl(shortId)).rejects.toThrow('URL not found');
    });

    it('should handle empty or null URLs', async () => {
        await expect(urlService.createShortenedUrl('')).rejects.toThrow('Invalid URL');
        await expect(urlService.createShortenedUrl(null)).rejects.toThrow('Invalid URL');
    });

    it('should handle a URL with query parameters', async () => {
        const longUrl = 'https://example.com?query=test';
        const result = await urlService.createShortenedUrl(longUrl);

        const baseUrl = process.env.BASE_URL || 'http://localhost:5000';
        expect(result.shortUrl).toMatch(new RegExp(`${baseUrl}/[\\w-]+`));

        const url = await Url.findOne({ longUrl });
        expect(url).toBeTruthy();
    });

    it('should handle a very long URL', async () => {
        const longUrl = 'https://example.com/' + 'a'.repeat(1000); 
        const result = await urlService.createShortenedUrl(longUrl);

        const baseUrl = process.env.BASE_URL || 'http://localhost:5000';
        expect(result.shortUrl).toMatch(new RegExp(`${baseUrl}/[\\w-]+`));

        const url = await Url.findOne({ longUrl });
        expect(url).toBeTruthy();
    });

    it('should handle a URL with special characters', async () => {
        const longUrl = 'https://example.com/路径/例'; 
        const result = await urlService.createShortenedUrl(longUrl);

        const baseUrl = process.env.BASE_URL || 'http://localhost:5000';
        expect(result.shortUrl).toMatch(new RegExp(`${baseUrl}/[\\w-]+`));

        const url = await Url.findOne({ longUrl });
        expect(url).toBeTruthy();
    });
});