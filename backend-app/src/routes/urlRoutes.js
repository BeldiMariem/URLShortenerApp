const express = require('express');
const { deleteUrl, createShortenedUrl, redirectUrl } = require('../controllers/urlController');

const router = express.Router();

/**
 * @swagger
 * /shorten:
 *   post:
 *     summary: Creates a shortened URL for the provided long URL.
 *     description: This endpoint takes a long URL and returns a shortened version of it.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               longUrl:
 *                 type: string
 *                 description: The long URL to shorten.
 *                 example: 'https://example.com/very-long-url'
 *     responses:
 *       200:
 *         description: Shortened URL created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 shortUrl:
 *                   type: string
 *                   description: The shortened URL.
 *                   example: 'http://localhost:5000/abc123'
 *       400:
 *         description: Invalid URL.
 *       500:
 *         description: Internal server error.
 */
router.post('/shorten', createShortenedUrl);

/**
 * @swagger
 * /{shortId}:
 *   get:
 *     summary: Redirects to the original URL associated with the provided short ID.
 *     description: Given a shortened URL's ID, this endpoint will redirect to the original URL.
 *     parameters:
 *       - name: shortId
 *         in: path
 *         required: true
 *         description: The short ID of the URL.
 *         schema:
 *           type: string
 *           example: 'shortId'
 *     responses:
 *       302:
 *         description: Successfully redirected to the original URL.
 *       404:
 *         description: URL not found.
 */
router.get('/:shortId', redirectUrl);

/**
 * @swagger
 * /delete/{shortId}:
 *   delete:
 *     summary: Deletes the shortened URL associated with the provided short ID.
 *     description: This endpoint allows you to delete a shortened URL using its short ID.
 *     parameters:
 *       - name: shortId
 *         in: path
 *         required: true
 *         description: The short ID of the URL to delete.
 *         schema:
 *           type: string
 *           example: 'shortId'
 *     responses:
 *       200:
 *         description: URL deleted successfully.
 *       404:
 *         description: URL not found.
 */
router.delete('/delete/:shortId', deleteUrl);

module.exports = router;
