import { TiWeatherCloudy, TiWeatherDownpour } from "react-icons/ti";
import { IoLocationOutline } from "react-icons/io5";

// Fake data
const WeatherWidget = () => {
  const weatherData = {
    location: "Evanston",
    current_temperatue: 62, // Farenheit
    high_temperature: 64,
    low_temperature: 57,
    weather_condition: "Cloudy",
    chance_of_rain: 12,
  };

  return (
    <div className="w-[90%] sm:w-[90%] md:max-w-sm lg:max-w-md my-2 mx-auto bg-gradient-to-b from-cyan-500 via-blue-400 to-cyan-500 rounded-lg shadow-lg text-white">
      <div className="flex-col p-3">
        <div className="flex justify-between mb-3">
          <div className="flex items-center">
            <IoLocationOutline className="mr-1 text-sm" />
            <p className="text-xs sm:text-sm">{weatherData.location}</p>
          </div>

          <p className="text-xs sm:text-sm">{weatherData.weather_condition}</p>
        </div>

        <div className="flex justify-between items-center mb-3">
          <p className="font-semibold text-3xl sm:text-4xl">
            {weatherData.current_temperatue}°F
          </p>
          <TiWeatherCloudy className="text-4xl sm:text-6xl" />
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
          <div className="flex items-center bg-white text-cyan-500 rounded-full shadow-sm py-1 px-2">
            <TiWeatherDownpour className="mr-1 text-sm" />
            <p className="text-xs sm:text-sm">{weatherData.chance_of_rain}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
