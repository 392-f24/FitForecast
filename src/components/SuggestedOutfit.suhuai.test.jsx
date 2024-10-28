import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SuggestedOutfit from '../components/SuggestedOutfit';
import { MemoryRouter } from 'react-router-dom';

// Mocking Firebase auth
vi.mock('../utilities/firebase', () => ({
  auth: {
    currentUser: { uid: 'testUserId' }
  }
}));

// Mocking the function to get suggested outfits
vi.mock('../utilities/functions', () => ({
  getSuggestedOutfit: vi.fn(() => Promise.resolve({
    data: {
      bottom: '',
      top: 'url',
      footwear: '',
      outerwear: '',
    }
  }))
}));

describe('SuggestedOutfit', () => {
  it('should display suggested clothes when the SuggestNewOutfit button is clicked and at least the top item is available', async () => {
    // Mock weather data and error as necessary
    const weatherData = { temperature: 70 }; // Example weather data
    const weatherError = null; // No weather error

    render(
      <MemoryRouter>
          <SuggestedOutfit weatherData={weatherData} weatherError={weatherError} />
      </MemoryRouter>
  );

    // Wait for the initial outfit suggestion to load
    await waitFor(() => {
      expect(screen.getByText(/today's outfit/i)).toBeInTheDocument();
    });

    // Find and click the "Suggest new outfit" button
    const suggestButton = screen.getByRole('button', { name: /suggest new outfit/i });
    fireEvent.click(suggestButton);

    // Assert that the new suggested outfit is displayed
    await waitFor(() => {
      expect(screen.getByRole('img', { name: /top/i })).toBeInTheDocument();
    });
  });
});
