import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import Closet from '../pages/Closet';

// Mocking the Firebase auth
vi.mock('../utilities/firebase', () => ({
  auth: {
    currentUser: { uid: 'testUserId' }
  }
}));

// Mocking the necessary database functions
vi.mock('../utilities/database', () => ({
  getClothesData: vi.fn((uid, callback) => {
    // Simulate fetching clothes data
    callback([]);
    return () => {}; // Return unsubscribe function
  }),
  getCategories: vi.fn(() => Promise.resolve({
    categoriesOrdered: ['shirt'],
    categoriesDict: {}
  })),
  writeData: vi.fn(() => Promise.resolve({})),
}));

vi.mock('../utilities/storage', () => ({
  uploadFile: vi.fn(() => Promise.resolve({})),
}));

vi.mock('firebase/storage', () => ({
  getDownloadURL: vi.fn(() => Promise.resolve('imageURL')),
}));

describe('EditForm', () => {
  it('should display form validation error when image is not uploaded', async () => {
    render(<Closet />);

    await screen.findByText("shirt");

    // Find and click the "Add Clothes" button
    const addClothesButton = screen.getByRole('button', { name: "add" });
    fireEvent.click(addClothesButton)

    // Assert that the editForm modal is now visible
    expect(screen.getByText(/Add Clothes/i)).toBeInTheDocument();

    const submitButton = screen.getByRole('button', { name: "Save" });
    fireEvent.click(submitButton);

    // Assert that the form validation error is displayed
    expect(screen.getByText(/Please upload an image/i)).toBeInTheDocument();
  });
});




