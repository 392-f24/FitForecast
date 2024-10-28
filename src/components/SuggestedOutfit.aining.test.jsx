import { describe, it, vi } from "vitest";
import SuggestedOutfit from "./SuggestedOutfit";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

// Mock Firebase auth
vi.mock("../utilities/firebase", () => ({
  auth: {
    currentUser: { uid: "testUserId" },
  },
}));

// Mock suggested outfit data
vi.mock("../utilities/functions", async () => ({
  getSuggestedOutfit: vi.fn().mockResolvedValue({
    top: "",
    bottom: "",
    outerwear: "",
    footwear: "",
  }),
}));

describe("Suggested Outfit", () => {
  it("given empty closet, should suggest add more clothes", async () => {
    const mockWeatherData = {
      location: "Evanston",
      current_temperature: 62,
      high_temperature: 64,
      low_temperature: 57,
    };

    const mockWeatherError = null;

    render(
      <MemoryRouter>
        <SuggestedOutfit
          weatherData={mockWeatherData}
          weatherError={mockWeatherError}
        />
      </MemoryRouter>
    );
    await screen.findByText(/Add more clothes to get an outfit suggestion!/);
  });
});
