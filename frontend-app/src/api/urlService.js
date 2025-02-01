import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_UR || 'http://localhost:5000';
export const shortenUrl = (longUrl) => {
    return axios.post(`${apiUrl}/shorten`, { longUrl });
};

export const resolveUrl = (shortId) => {
    return axios.get(`${apiUrl}/${shortId}`);
};
