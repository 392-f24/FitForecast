import { render, screen } from "@testing-library/react";
import { describe, it, vi, expect } from "vitest";
import SuggestedOutfit from "./SuggestedOutfit";
import { MemoryRouter } from "react-router-dom";

// Mock Firebase auth
vi.mock("../utilities/firebase", () => ({
  auth: {
    currentUser: { uid: "testUserId" },
  },
}));

// Mock the getSuggestedOutfit function
vi.mock("../utilities/functions", () => ({
  getSuggestedOutfit: vi.fn(() =>
    Promise.resolve({
      top: "",
      bottom: "",
      outerwear: "",
      footwear: "",
    })
  ),
}));

describe("SuggestedOutfit Component", () => {
  it("displays a message asking the user to add clothes when no clothes are in the closet", async () => {
    const mockWeatherData = { temp: 20 }; // Example weather data
    const mockWeatherError = null;

    render(
      <MemoryRouter>
        <SuggestedOutfit
          weatherData={mockWeatherData}
          weatherError={mockWeatherError}
        />
      </MemoryRouter>
    );

    // Wait for the outfit loading to finish
    const messageElement = await screen.findByText(
      /Add more clothes to get an outfit suggestion!/i
    );

    // Check if the message is displayed
    expect(messageElement).toBeInTheDocument();
  });
});
