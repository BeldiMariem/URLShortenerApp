const shortid = require('shortid');
const Url = require('../models/Url');
const { InvalidUrlError, UrlNotFoundError } = require('../errors'); 

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
    console.log("Looking for shortId:", shortId);  
    const url = await Url.findOne({ shortId });
    if (!url) {
        throw new UrlNotFoundError('URL not found');
    }

    return url.longUrl;
};

exports.deleteUrl = async (shortId) => {
    const url = await Url.findOneAndDelete({ shortId });
    if (!url) {
        throw new UrlNotFoundError('URL not found');
    }
};
