import { describe, it, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Closet from './Closet';
import { getClothesData, getCategories } from '../utilities/database';
import { auth } from '../utilities/firebase';

vi.mock('../utilities/database');
vi.mock('../utilities/firebase');

const mockCategories = {
  categoriesOrdered: ['T-Shirts', 'Pants', 'Shoes'],
  categoriesDict: { 'T-Shirts': {}, Pants: {}, Shoes: {} },
};

const mockUser = { uid: '12345' };

const mockClothesData = [
  { category: 'Pants', imageURL: 'pants1.png' },
  { category: 'Shoes', imageURL: 'shoes1.png' },
];

beforeEach(() => {
  // Mock Firebase Authentication
  auth.currentUser = mockUser;

  // Mock database calls
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

    // Wait for the categories to load and ensure "T-Shirts" category is selectable
    await screen.findByText('T-Shirts');

    // Click the "T-Shirts" category button
    const tShirtButton = screen.getByRole('button', { name: /T-Shirts/i });
    tShirtButton.click();

    // Verify the placeholder message
    const message = await screen.findByText(/add your first t-shirt/i);
    expect(message).toBeInTheDocument();
  });
});
