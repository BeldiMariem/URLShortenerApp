const shortid = require('shortid');
const Url = require('../models/Url');

const baseUrl = process.env.BASE_URL || 'http://localhost:5000';

/**
 * @swagger
 * /shorten:
 *   post:
 *     summary: Create a shortened URL
 *     description: Creates a shortened URL for the provided long URL.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               longUrl:
 *                 type: string
 *                 description: The original long URL to shorten.
 *                 example: "https://example.com/very-long-url"
 *     responses:
 *       200:
 *         description: Successfully shortened the URL
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 shortUrl:
 *                   type: string
 *                   example: "http://localhost:5000/abc123"
 *       400:
 *         description: Invalid URL provided
 *       500:
 *         description: Internal server error
 */
exports.createShortenedUrl = async (req, res) => {
    const { longUrl } = req.body;

    if (!longUrl || !isValidUrl(longUrl)) {
        return res.status(400).json({ error: 'Invalid URL' });
    }

    try {
        const shortId = shortid.generate();
        const url = new Url({ longUrl, shortId });

        await url.save();
        res.json({ shortUrl: `${baseUrl}/${shortId}` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

/**
 * @swagger
 * /{shortId}:
 *   get:
 *     summary: Redirect to the original URL
 *     description: Redirects to the original URL associated with the provided short ID.
 *     parameters:
 *       - in: path
 *         name: shortId
 *         required: true
 *         description: The shortened URL ID.
 *         schema:
 *           type: string
 *           example: "abc123"
 *     responses:
 *       302:
 *         description: Redirects to the original URL
 *       404:
 *         description: URL not found
 *       500:
 *         description: Internal server error
 */
exports.redirectUrl = async (req, res) => {
    const { shortId } = req.params;

    try {
        const url = await Url.findOne({ shortId });

        if (!url) {
            return res.status(404).json({ error: 'URL not found' });
        }

        res.redirect(url.longUrl);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    } catch (err) {
        return false;
    }
}

/**
 * @swagger
 * /delete/{shortId}:
 *   delete:
 *     summary: Delete a shortened URL
 *     description: Deletes the shortened URL associated with the provided short ID.
 *     parameters:
 *       - in: path
 *         name: shortId
 *         required: true
 *         description: The shortened URL ID to delete.
 *         schema:
 *           type: string
 *           example: "abc123"
 *     responses:
 *       200:
 *         description: Successfully deleted the shortened URL
 *       404:
 *         description: URL not found
 *       500:
 *         description: Internal server error
 */
exports.deleteUrl = async (req, res) => {
    const { shortId } = req.params;

    const url = await Url.findOneAndDelete({ shortId });

    if (!url) {
        return res.status(404).json({ error: 'URL not found' });
    }

    res.json({ message: 'URL deleted successfully' });
};
