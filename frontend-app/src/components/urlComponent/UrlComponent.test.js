import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UrlComponent from './urlComponent'; // Make sure the path is correct
import axios from 'axios';

jest.mock('axios');
jest.setTimeout(30000); 

describe('UrlComponent', () => {
    it('should call the shortenUrl function and display the shortened URL', async () => {
        const mockResponse = { data: { shortUrl: 'http://short.url/short' } };
        axios.post.mockResolvedValue(mockResponse); 
        render(<UrlComponent setShortUrl={() => {}} />);

        const inputElement = screen.getByPlaceholderText('Enter a long URL');
        const buttonElement = screen.getByText('Shorten');

        fireEvent.change(inputElement, { target: { value: 'http://example.com' } });
        fireEvent.click(buttonElement);

        await waitFor(() => screen.getByText('Shortened URL:'));

        expect(screen.getByText(mockResponse.data.shortUrl)).toBeInTheDocument();
    });
});
