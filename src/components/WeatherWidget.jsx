import {
  TiWeatherCloudy,
  TiWeatherDownpour,
  TiWeatherSunny,
  TiWeatherPartlySunny,
  TiWeatherStormy,
  TiWeatherSnow,
  TiWeatherShower,
} from "react-icons/ti";
import { IoLocationOutline } from "react-icons/io5";
import { useState, useEffect } from "react";

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

const WeatherWidget = () => {
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

        console.log(data);

        const currentWeather = {
          location: data.name,
          current_temperature: kelvinToFahrenheit(data.main.temp),
          high_temperature: kelvinToFahrenheit(data.main.temp_max),
          low_temperature: kelvinToFahrenheit(data.main.temp_min),
          weather_condition: data.weather[0].main, //rain, snow, clouds,
          chance_of_rain: data.rain ? Math.round(data.rain["1h"] * 100) : 0,
          weather_icon: weatherIconMapping[data.weather[0].icon],
        };

        console.log(currentWeather);
        setWeatherData(currentWeather);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchWeatherData();
  }, [isEvanston]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!weatherData) {
    return <p>Loading weather data...</p>;
  }

  const WeatherIcon = weatherData.weather_icon;

  const toggleLocation = () => {
    setIsEvanston(!isEvanston);
  };

  return (
    <div className="w-full sm:w-[90%] md:max-w-sm lg:max-w-md my-2 mx-auto bg-gradient-to-b from-[#429CB0] via-[#429CB0] to-[#80BCC9] rounded-lg shadow-lg text-white">
      <div className="flex-col p-3">
        <div className="flex justify-between mb-3">
          <div className="flex items-center">
            <IoLocationOutline className="mr-1 text-sm" />
            <p className="text-xs sm:text-sm">{weatherData.location}</p>
            {/* <button
              onClick={toggleLocation}
              className="text-white bg-transparent p-1 rounded text-xs"
            >
              <span className="material-symbols-rounded text-xs">
                autorenew
              </span>
            </button> */}
          </div>

          <p className="text-xs sm:text-sm">{weatherData.weather_condition}</p>
        </div>

        <div className="flex justify-between items-center mb-3">
          <p className="font-semibold text-3xl sm:text-4xl">
            {weatherData.current_temperature}°F
          </p>
          <WeatherIcon className="text-4xl sm:text-6xl" />
        </div>

        <div className="flex justify-between items-center">
          <div className="flex justify-start">
            <p className="text-xs sm:text-sm mr-1">
              {weatherData.high_temperature}°
            </p>
            <p className="text-slate-200 text-xs sm:text-sm">
              {weatherData.low_temperature}°
            </p>
          </div>
          <div className="flex items-center bg-white text-cyan-700 rounded-full shadow-sm py-1 px-2">
            <TiWeatherDownpour className="mr-1 text-sm" />
            <p className="text-xs sm:text-sm">{weatherData.chance_of_rain}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
