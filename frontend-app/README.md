# URL Shortener Frontend

This is the frontend for the URL Shortener application, built with React (v19.0.0). It allows users to input a long URL, shorten it, and view the shortened URL.

---

## Table of Contents
1. [Features](#features)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Available Scripts](#available-scripts)
5. [Environment Variables](#environment-variables)
6. [Contributing](#contributing)
7. [License](#license)

---

## Features

- **Shorten URLs**: Users can input a long URL and get a shortened version.
- **Redirect**: Users can click on the shortened URL to be redirected to the original URL.
- **Error Handling**: Displays error messages for invalid URLs or server issues.

---

## Installation

1. Clone the repository:
```bash
   git clone https://github.com/BeldiMariem/URLShortenerApp.git
   cd frontend-app
   ```
2. Install dependencies:
```bash
npm install
```
3. Set up environment variables:
* Create a .env file in the root directory.
* Add the following variable:
```env
BASE_URL=http://localhost:5000
```
4. Start the development server:
```bash
npm start
```
## Usage
Once the development server is running, open your browser and navigate to http://localhost:3000.
### Shorten a URL
1. Enter a long URL in the input field.
2. Click the "Shorten" button.
3. The shortened URL will be displayed below the input field.

### Redirect to the Original URL
1. Click on the shortened URL.
2. You will be redirected to the original URL.

## Available Scripts
In the project directory, you can run:
* npm start: Starts the development server.
* npm test: Runs the test suite.

## Environment 
The following environment variable is required:
API_URL: The base URL of the backend API (e.g., http://localhost:5000).

