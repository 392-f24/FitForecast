import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import AddClothesButton from './AddClothesButton';
import Closet from '../pages/Closet';

vi.mock('../utilities/firebase', () => ({
    auth: {
      currentUser: { uid: 'testUserId' },
    },
  }));

  vi.mock('../utilities/database', () => ({
    getClothesData: vi.fn((uid, callback) => {
      callback([]); // Simulate an empty clothes list
      return () => {}; // Return unsubscribe function
    }),
    getCategories: vi.fn(() => Promise.resolve({
      categoriesOrdered: ['shirt'],
      categoriesDict: {}
    }))
  }));
  
describe('AddClothesButton', () => {
  it('should open the Add Clothes form when the Add button is clicked', async () => {
    render(<Closet />);
    await screen.findByText("shirt");

    const addButton = screen.getByRole('button', { name: /add/i });
    fireEvent.click(addButton);

    expect(screen.getByText(/Add Clothes/i)).toBeInTheDocument();
    
  });
});
