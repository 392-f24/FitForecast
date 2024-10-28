import { render, screen } from "@testing-library/react";
import WeatherWidget from "./WeatherWidget";
import { describe, it, expect, vi } from "vitest";

describe("WeatherWidget Component", () => {
  it("renders correctly with provided weather data", () => {
    const mockWeatherData = {
      location: "Evanston",
      weather_condition: "Sunny",
      current_temperature: 75,
      high_temperature: 80,
      low_temperature: 65,
      chance_of_rain: 10,
      weather_icon: () => <span data-testid="weather-icon" />,
    };
    const mockToggleLocation = vi.fn();

    render(
      <WeatherWidget
        weatherData={mockWeatherData}
        weatherError={false}
        toggleLocation={mockToggleLocation}
      />
    );

    expect(screen.getByText("Evanston")).toBeInTheDocument();
    expect(screen.getByText("75°F")).toBeInTheDocument();
    expect(screen.getByText("65°")).toBeInTheDocument();
    expect(screen.getByText("80°")).toBeInTheDocument();
    expect(screen.getByTestId("weather-icon")).toBeInTheDocument();
  });

  it("shows error message when weatherError is true", () => {
    const mockWeatherData = {
      location: "Evanston",
      weather_condition: "Sunny",
      current_temperature: 75,
      high_temperature: 80,
      low_temperature: 65,
      chance_of_rain: 10,
      weather_icon: () => <span data-testid="weather-icon" />,
    };
    const mockToggleLocation = vi.fn();

    render(
      <WeatherWidget
        weatherData={mockWeatherData}
        weatherError={true}
        toggleLocation={mockToggleLocation}
      />
    );

    // Check if error message is rendered
    expect(screen.getByText(/Error occured:/i)).toBeInTheDocument();
  });
});
