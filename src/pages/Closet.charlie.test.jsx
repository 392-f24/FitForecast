import { render, screen, fireEvent } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import Closet from './Closet';
import { getCategories, getClothesData } from "../utilities/database";
import { auth } from "../utilities/firebase";

// Mock Firebase auth
vi.mock("../utilities/firebase", () => ({
  auth: {
    currentUser: { uid: "testUserId" },
  },
}));

// Mock getCategories function
vi.mock("../utilities/database", () => ({
  getCategories: vi.fn(),
  getClothesData: vi.fn(),
}));

describe("Closet Empty Category", () => {
  it("should show the message 'Add your first shirt! You haven't added any to your closet yet.' when no T-Shirts exist in the user's closet and the T-Shirt category is selected", async () => {
    // Mock categories and clothes data
    const mockCategories = {
      categoriesOrdered: ["T-Shirt", "Jacket", "Sneakers"],
      categoriesDict: {},
    };

    // Mock return values for getCategories and getClothesData
    getCategories.mockResolvedValue(mockCategories);
    getClothesData.mockImplementation((uid, callback) => {
      callback([]); // no clothes in the closet, so no t-shirts
      return () => {}; // Simulate unsubscribe function
    });

    // Render the Closet component
    render(<Closet />);

    // Wait for the T-Shirt filter button to appear
    await screen.findByText("T-Shirt");

    // Click the T-Shirt filter button
    const tshirtButton = screen.getByRole('button', { name: /T-Shirt/i });
    fireEvent.click(tshirtButton);

    // Check that the message for no T-Shirts appears
    const noTShirtsMessage = screen.getByText(
      /Add your first t-shirt! You haven't added any to your closet yet./i
    );
    expect(noTShirtsMessage).toBeInTheDocument();
  });
});
