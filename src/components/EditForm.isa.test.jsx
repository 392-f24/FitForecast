import { render, screen, fireEvent, within } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import EditForm from "../components/EditForm";

vi.mock("../utilities/firebase", () => ({
  auth: {
    currentUser: { uid: "testUserId" },
  },
}));

vi.mock("../components/WarmthLevelInfo", () => ({
  default: () => <div data-testid="warmth-info-mock" />,
}));

describe("EditForm Warmth Level Visibility", () => {
  it("should hide the warmth level input when a category with a parent category of 'Footwear' is selected", () => {
    const mockCategories = ["Sneakers", "T-Shirt"];
    const mockCategoriesDict = {
      Sneakers: "Footwear",
      "T-Shirt": "Top",
    };
    const setShowModal = vi.fn();

    render(
      <EditForm
        showModal={true}
        setShowModal={setShowModal}
        categories={mockCategories}
        categoriesDict={mockCategoriesDict}
        editing={false}
      />
    );

    expect(screen.getByText(/Add Clothes/i)).toBeInTheDocument();

    // click on category dropdown
    const categoryDropdownButton = screen.getByRole("button", {
      name: /Category/i,
    });
    fireEvent.click(categoryDropdownButton);

    const dropdownOptions = screen.getByRole("listbox");

    // select sneakers within dropdown
    const sneakersOption = within(dropdownOptions).getByText("Sneakers");
    fireEvent.click(sneakersOption);

    // check warmth level isn't there
    const warmthLevelInput = screen.queryByLabelText(/Warmth Level/i);
    expect(warmthLevelInput).toBeNull();
  });
});
