const shortid = require('shortid');
const Url = require('../models/Url');
const baseUrl = process.env.BASE_URL || 'http://localhost:5000';

function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    } catch (err) {
        return false;
    }
}

exports.createShortenedUrl = async (longUrl) => {
    if (!longUrl || !isValidUrl(longUrl)) {
        throw new InvalidUrlError('Invalid URL');
    }

    const shortId = shortid.generate();
    const url = new Url({ longUrl, shortId });
    await url.save();

    return { shortUrl: `${baseUrl}/${shortId}` };
};

exports.redirectUrl = async (shortId) => {
    const url = await Url.findOne({ shortId });
    if (!url) {
        throw new UrlNotFoundError('URL not found');
    }

    return url.longUrl;
};
class InvalidUrlError extends Error {
    constructor(message) {
        super(message);
        this.name = "InvalidUrlError";
    }
}

class UrlNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "UrlNotFoundError";
    }
}