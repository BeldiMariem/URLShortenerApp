const urlService = require('../services/urlService'); 

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
    try {
        const { longUrl } = req.body;
        
        const result = await urlService.createShortenedUrl(longUrl); // Call service method
        res.json(result);
    } catch (err) {
        return res.status(err.name === 'InvalidUrlError' ? 400 : 500).json({ error: err.message });

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
    try {
        const { shortId } = req.params;
        const longUrl = await urlService.redirectUrl(shortId); // Call service method
        res.redirect(longUrl);
    } catch (err) {
        return res.status(err.name === 'UrlNotFoundError' ? 404 : 500).json({ error: err.message });
    }
};

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
    try {
        const { shortId } = req.params;
        await urlService.deleteUrl(shortId); 
        res.json({ message: 'URL deleted successfully' });
    } catch (err) {
        res.status(err.name === 'UrlNotFoundError' ? 404 : 500).json({ error: err.message });
    }
};