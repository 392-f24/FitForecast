import { render, screen, fireEvent, within } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import EditForm from "../components/EditForm";

// Mock Firebase authentication
vi.mock("../utilities/firebase", () => ({
  auth: {
    currentUser: { uid: "testUserId" },
  },
}));

// Mock WarmthLevelInfo component to avoid rendering the actual component
vi.mock("../components/WarmthLevelInfo", () => ({
  default: () => <div data-testid="warmth-info-mock" />,
}));

// Utility function to select a category from the dropdown
const selectCategory = (categoryName) => {
  // Open category dropdown
  const categoryDropdownButton = screen.getByRole("button", { name: /Category/i });
  fireEvent.click(categoryDropdownButton);

  // Get the dropdown options and select the category
  const dropdownOptions = screen.getByRole("listbox");
  const categoryOption = within(dropdownOptions).getByText(categoryName);
  fireEvent.click(categoryOption);
};

describe("EditForm Warmth Level Input Visibility", () => {
  it("displays the warmth level input after switching from 'Footwear' to another category", () => {
    const categories = ["Sneakers", "T-Shirt"];
    const categoriesDict = {
      Sneakers: "Footwear",
      "T-Shirt": "Top",
    };
    const setShowModal = vi.fn();

    // Render the EditForm component
    render(
      <EditForm
        showModal={true}
        setShowModal={setShowModal}
        categories={categories}
        categoriesDict={categoriesDict}
        editing={false}
      />
    );

    // Verify the form header is rendered
    expect(screen.getByText(/Add Clothes/i)).toBeInTheDocument();

    // Select Sneakers from the category dropdown
    selectCategory("Sneakers");

    // Assert that the warmth level input is not visible
    let warmthLevelInput = screen.queryByLabelText(/Warmth Level/i);
    expect(warmthLevelInput).toBeNull();

    // Switch the category to T-Shirt
    selectCategory("T-Shirt");

    // Assert that the warmth level input is now visible
    warmthLevelInput = screen.getByLabelText(/Warmth Level/i);
    expect(warmthLevelInput).toBeInTheDocument();
  });
});
