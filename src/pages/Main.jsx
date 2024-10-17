import SuggestedOutfit from "../components/SuggestedOutfit";
import WeatherWidget from "../components/WeatherWidget";
import { useState, useEffect } from "react";
import {
  TiWeatherCloudy,
  TiWeatherDownpour,
  TiWeatherSunny,
  TiWeatherPartlySunny,
  TiWeatherStormy,
  TiWeatherSnow,
  TiWeatherShower,
} from "react-icons/ti";

const kelvinToFahrenheit = (kelvin) =>
  Math.round(((kelvin - 273.15) * 9) / 5 + 32);

const weatherIconMapping = {
  "01d": TiWeatherSunny,
  "01n": TiWeatherSunny,
  "02d": TiWeatherPartlySunny,
  "02n": TiWeatherPartlySunny,
  "03d": TiWeatherCloudy,
  "03n": TiWeatherCloudy,
  "04d": TiWeatherCloudy,
  "04n": TiWeatherCloudy,
  "09d": TiWeatherShower,
  "09n": TiWeatherShower,
  "10d": TiWeatherDownpour,
  "10n": TiWeatherDownpour,
  "11d": TiWeatherStormy,
  "11n": TiWeatherStormy,
  "13d": TiWeatherSnow,
  "13n": TiWeatherSnow,
  "50d": TiWeatherCloudy,
  "50n": TiWeatherCloudy,
};

function Main() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  // Used for testing purposes
  const [isEvanston, setIsEvanston] = useState(true);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const lat = isEvanston ? 42.0451 : 25.7617;
        const lon = isEvanston ? -87.6877 : -80.1918;
        const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }

        const data = await response.json();

        const currentWeather = {
          location: data.name,
          current_temperature: kelvinToFahrenheit(data.main.temp),
          high_temperature: kelvinToFahrenheit(data.main.temp_max),
          low_temperature: kelvinToFahrenheit(data.main.temp_min),
          weather_condition: data.weather[0].main, //rain, snow, clouds,
          chance_of_rain: data.rain ? Math.round(data.rain["1h"] * 100) : 0,
          weather_icon: weatherIconMapping[data.weather[0].icon],
        };

        setWeatherData(currentWeather);
      } catch (err) {
        setError(err.message);

        const dummyWeatherData = {
          location: "Evanston",
          current_temperature: 62,
          high_temperature: 64,
          low_temperature: 57,
          weather_condition: "clouds",
          chance_of_rain: 12,
          weather_icon: weatherIconMapping["03d"],
        };

        setWeatherData(dummyWeatherData);
      }
    };

    fetchWeatherData();
  }, [isEvanston]);


  const toggleLocation = () => {
    setIsEvanston(!isEvanston);
  };

  return (
    <div className="flex flex-col items-center p-4 gap-4">
      <WeatherWidget weatherData={weatherData} error={error} />
      <button
        onClick={toggleLocation}
        className="text-white bg-black p-1 rounded text-xs">
        <span className="material-symbols-rounded text-xs">
          autorenew
        </span>
      </button>
      <SuggestedOutfit weatherData={weatherData} error={error} />
    </div >
  );
};
export default Main;
