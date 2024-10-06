import WeatherWidget from "../components/WeatherWidget";

function Main() {
  return (
    <div>
      <div className="flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Main Page</h1>
          <p className="text-lg">Welcome to the main page!</p>
        </div>
      </div>
      <WeatherWidget />
    </div>
  );
}

export default Main;
