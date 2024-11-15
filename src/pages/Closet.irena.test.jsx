import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import Closet from './Closet';

vi.mock('../utilities/firebase', () => ({
  auth: {
    currentUser: { uid: 'testUserId' },
  },
}));

vi.mock('../utilities/database', () => ({
  getClothesData: vi.fn((uid, callback) => {
    const testClothesData = [
      { category: 'TShirt', imageURL: 'tshirt-image' },
      { category: 'TShirt', imageURL: 'tshirt-image-2' },
      { category: 'Pants', imageURL: 'pants-image' },
      { category: 'Sneakers', imageURL: 'sneakers-image' },
      { category: 'Jackets', imageURL: 'jacket-image' },
    ];
    callback(testClothesData);
    return () => {};
  }),
  getCategories: vi.fn(() =>
    Promise.resolve({
      categoriesOrdered: ['TShirt', 'Pants', 'Sneakers'],
      categoriesDict: {},
    })
  ),
}));

describe('Closet Category Filter', () => {
  it('displays only items from the selected category when a category is clicked', async () => {
    render(<Closet />);

    await screen.findByText("TShirt");

    const tshirtButton = screen.getByRole('button', { name: /TShirt/i });
    fireEvent.click(tshirtButton);

    expect(screen.getByAltText('Clothing item 1')).toHaveAttribute('src', 'tshirt-image');
    expect(screen.getByAltText('Clothing item 2')).toHaveAttribute('src', 'tshirt-image-2');
    expect(screen.queryByAltText('Clothing item 3')).not.toBeInTheDocument();
    expect(screen.queryByAltText('Clothing item 4')).not.toBeInTheDocument();
    expect(screen.queryByAltText('Clothing item 5')).not.toBeInTheDocument();
  });
});
