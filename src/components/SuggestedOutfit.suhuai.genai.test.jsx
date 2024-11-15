import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SuggestedOutfit from "./SuggestedOutfit"; // Update the path as per your project structure
import { vi, describe, it, expect } from "vitest";
import { getSuggestedOutfit } from "../utilities/functions"; // Update the path as per your project structure
import { auth } from "../utilities/firebase";

// Mocking the required utilities
vi.mock("../utilities/functions", () => ({
  getSuggestedOutfit: vi.fn(),
}));

vi.mock("../utilities/firebase", () => ({
  auth: { currentUser: { uid: "test-uid" } },
}));

describe("SuggestedOutfit Component", () => {
  it("should display suggested clothes when the SuggestNewOutfit button is clicked and at least the top item is available", async () => {
    const mockWeatherData = { temperature: 20, condition: "Clear" }; // Example weather data
    const mockOutfit = {
      bottom: "bottom-url",
      top: "top-url",
      footwear: "footwear-url",
      outerwear: "outerwear-url",
    };

    getSuggestedOutfit.mockResolvedValue({ data: mockOutfit });

    render(<SuggestedOutfit weatherData={mockWeatherData} weatherError={false} />);

    // Wait for initial loading to complete
    await waitFor(() => {
      expect(screen.getByText("Today's Outfit")).toBeInTheDocument();
    });

    // Check if initial outfit is rendered
    expect(screen.getByText("Today's Outfit")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /suggest new outfit/i })).toBeInTheDocument();

    // Mock button click for suggesting a new outfit
    const suggestButton = screen.getByRole("button", { name: /suggest new outfit/i });
    fireEvent.click(suggestButton);

    // Wait for the new outfit to load
    await waitFor(() => {
      expect(getSuggestedOutfit).toHaveBeenCalledTimes(2); // Called initially and on button click
      expect(screen.getByText("Today's Outfit")).toBeInTheDocument();
    });

    // Validate the rendered clothes
    const topImage = screen.getByRole("img", { name: /top/i });
    expect(topImage).toHaveAttribute("src", "top-url");

    const bottomImage = screen.getByRole("img", { name: /bottom/i });
    expect(bottomImage).toHaveAttribute("src", "bottom-url");

    const footwearImage = screen.getByRole("img", { name: /footwear/i });
    expect(footwearImage).toHaveAttribute("src", "footwear-url");

    const outerwearImage = screen.getByRole("img", { name: /outerwear/i });
    expect(outerwearImage).toHaveAttribute("src", "outerwear-url");
  });
});
