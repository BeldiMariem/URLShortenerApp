import React, { useState } from 'react';
import { shortenUrl } from '../../api/urlService'; 
import './UrlComponent.css'; // Import the CSS file

function UrlComponent() {
    const [longUrl, setLongUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await shortenUrl(longUrl); 
            setShortUrl(response.data.shortUrl); 
        } catch (error) {
            console.error('Error shortening URL:', error);
        }
    };

    return (
        <div className="container">
            <div className="card">
                <h2 className="heading">URL Shortener</h2>
                <form onSubmit={handleSubmit} className="form">
                    <input
                        type="text"
                        placeholder="Enter a long URL"
                        value={longUrl}
                        onChange={(e) => setLongUrl(e.target.value)}
                        className="input"
                    />
                    <button type="submit" className="button">Shorten</button>
                </form>
                {shortUrl && (
                    <div className="resultContainer">
                        <p className="resultText">Shortened URL:</p>
                        <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="resultLink">
                            {shortUrl}
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}

export default UrlComponent;
