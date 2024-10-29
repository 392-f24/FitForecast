import { render, screen, fireEvent, within } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import EditForm from "../components/EditForm";

vi.mock("../utilities/firebase", () => ({
  auth: {
    currentUser: { uid: "testUserId" },
  },
}));

vi.mock("../components/WarmthLevelInfo", () => ({
  default: ({ isVisible }) =>
    isVisible ? (
      <div data-testid="warmth-info-tooltip">Warmth Level Information</div>
    ) : null,
}));

describe("EditForm Warmth Level Tooltip", () => {
  it("should display the warmth level tooltip when the info button is clicked", () => {
    const mockCategories = ["T-Shirt", "Sweater"];
    const mockCategoriesDict = {
      "T-Shirt": "Top",
      Sweater: "Top",
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

    const infoButtons = screen.queryAllByRole("button");
    const warmthInfoButton = infoButtons.find((button) =>
      within(button).queryByText(/info/i)
    );
    expect(warmthInfoButton).toBeDefined();

    fireEvent.click(warmthInfoButton);

    const tooltip = screen.getByTestId("warmth-info-tooltip");
    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toHaveTextContent("Warmth Level Information");
  });
});
