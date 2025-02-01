# URL Shortener API


This is a simple **URL shortener API** built with **Node.js** (v22.13.1), **Express** (v4.21.2), and **MongoDB**. It allows you to create shortened URLs, redirect to the original URLs using the shortened ID, and delete shortened URLs.

This project also includes **Swagger UI** for API documentation.

## Table of Contents
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
  - [Create a Shortened URL](#create-a-shortened-url)
  - [Redirect to Original URL](#redirect-to-original-url)
  - [Delete a Shortened URL](#delete-a-shortened-url)
- [Error Handling](#error-handling)
- [Access API Documentation](#access-api-documentation)
- [Test the application](#error-handling)
- [License](#license)

## Installation
To set up the project, follow these steps:

1. **Clone the repository**:
```bash
    git clone https://github.com/BeldiMariem/URLShortenerApp.git
    cd backend-app
```

2. **Install dependencies**:
```bash
    npm install
 ```

3. **Start the server**:
 ```bash
    npm run dev
```
The server will run on `http://localhost:5000` by default.

## Environment Variables
Make sure to configure your `.env` file:
```env
CORS_ORIGIN=http://localhost:3000
MONGO_URI=mongodb://localhost:27017/urlshortener
BASE_URL=http://localhost:5000
PORT=5000
```

Make sure to configure your `.env.test` file:
```env
MONGO_URI=mongodb://127.0.0.1:12345/test

```

## API Endpoints

### Create a Shortened URL
**Endpoint**: `POST /shorten`

**Description**: Creates a shortened URL for the provided long URL.

**Request Body**:
```json
{
  "longUrl": "https://example.com/very-long-url"
}
```
**Response**:

```json
{
  "shortUrl": "http://localhost:5000/shortid"
}
```

### Redirect to Original URL
**Endpoint**: `GET /:shortId`

**Description**: Redirects to the original URL associated with the provided short ID.

Example: GET /abc123 will redirect to the original URL.

### Delete a Shortened URL
**Endpoint**: DELETE /delete/:shortId

**Description**: Deletes the shortened URL associated with the provided short ID.

**Response**:

```json
{
  "message": "URL deleted successfully"
}
```
## Error Handling
**400 Bad Request: Invalid URL provided.**

**404 Not Found: Shortened URL not found.**

**500 Internal Server Error: Unexpected server error.**

## Access API Documentation
This project uses Swagger to generate interactive API documentation. You can access it at:

[Swagger UI](http://localhost:5000/api-docs/)
This interface allows you to explore the available endpoints, send test requests, and see the expected responses.


