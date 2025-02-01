import React, { useState } from "react";
import { shortenUrl } from "../../api/urlService";
import "./UrlComponent.css";

function UrlComponent() {
    const [longUrl, setLongUrl] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const [error, setError] = useState(""); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); 
        setShortUrl(""); 

        try {
            const response = await shortenUrl(longUrl);
            setShortUrl(response.data.shortUrl);
        } catch (error) {
            setError("Failed to shorten URL. Please try again.");
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
                        onChange={(e) => {
                            setLongUrl(e.target.value);
                            setError(""); 
                        }}
                        className="input"
                    />
                    <button type="submit" className="button" disabled={!longUrl}>
                        Shorten
                    </button>
                </form>

                {/* Show error message if there's an error */}
                {error && <p className="errorMessage">{error}</p>}

                {/* Show the short URL if available */}
                {shortUrl && (
                    <div className="resultContainer">
                        <p className="resultText">Shortened URL:</p>
                        <a
                            href={shortUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="resultLink"
                        >
                            {shortUrl}
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}

export default UrlComponent;
