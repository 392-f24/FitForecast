import { describe, it, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Closet from './Closet';

// Mock the utilities
vi.mock('../utilities/firebase', () => ({
  auth: { currentUser: { uid: '12345' } },
}));

vi.mock('../utilities/database', () => ({
  getCategories: vi.fn(),
  getClothesData: vi.fn(),
}));

// Import mocked utilities
import { getCategories, getClothesData } from '../utilities/database';

const mockCategories = {
  categoriesOrdered: ['T-Shirts', 'Pants', 'Shoes'],
  categoriesDict: { 'T-Shirts': {}, Pants: {}, Shoes: {} },
};

const mockClothesData = [
  { category: 'Pants', imageURL: 'pants1.png' },
  { category: 'Shoes', imageURL: 'shoes1.png' },
];

beforeEach(() => {
  // Set up mocks
  getCategories.mockResolvedValue(mockCategories);
  getClothesData.mockImplementation((uid, callback) => {
    callback(mockClothesData);
    return () => {}; // Mock unsubscribe function
  });
});

afterEach(() => {
  vi.resetAllMocks();
});

describe('Closet component', () => {
  it('displays "Add your first t-shirt!" message when no t-shirts are uploaded', async () => {
    // Render the Closet component
    render(<Closet />);

    // Wait for categories to load
    await screen.findByText('T-Shirts');

    // Click the "T-Shirts" category button
    const tShirtButton = screen.getByRole('button', { name: /T-Shirts/i });
    fireEvent.click(tShirtButton);

    // Verify the placeholder message
    const message = await screen.findByText(/add your first t-shirt/i);
    expect(message).toBeInTheDocument();
  });
});
