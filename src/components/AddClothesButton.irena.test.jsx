import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import AddClothesButton from './AddClothesButton';
import Closet from '../pages/Closet';

// Mocking Firebase utilities
vi.mock('../utilities/firebase', () => ({
  auth: {
    currentUser: { uid: 'testUserId' },
  },
}));

// Mocking database utilities
vi.mock('../utilities/database', () => ({
  getClothesData: vi.fn((uid, callback) => {
    // Simulate an empty clothes list
    callback([]);
    // Return an unsubscribe function
    return () => {};
  }),
  getCategories: vi.fn(() =>
    Promise.resolve({
      categoriesOrdered: ['shirt'],
      categoriesDict: {},
    })
  ),
}));

describe('AddClothesButton Component', () => {
  it('displays the Add Clothes form when the Add button is clicked', async () => {
    // Render the Closet component
    render(<Closet />);

    // Ensure the "shirt" category is displayed
    await screen.findByText('shirt');

    // Find and click the Add button
    const addButton = screen.getByRole('button', { name: /add/i });
    fireEvent.click(addButton);

    // Verify that the Add Clothes form appears
    expect(screen.getByText(/Add Clothes/i)).toBeInTheDocument();
  });
});
