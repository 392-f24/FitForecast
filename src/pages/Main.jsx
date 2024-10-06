import SuggestedOutfit from "../components/SuggestedOutfit";
import WeatherWidget from "../components/WeatherWidget";

function Main() {
  return (
    <div className="flex flex-col items-center p-4 gap-4">
      <WeatherWidget />
      <SuggestedOutfit />
    </div>
  );
}

export default Main;
