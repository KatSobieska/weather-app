import PickCity from "../PickCity/PickCity";
import WeatherSummary from "../WeatherSummary/WeatherSummary";
import Loader from "../Loader/Loader";
import { useCallback, useState } from "react";

const WeatherBox = () => {
  const [cityWeatherData, setCityWeatherData] = useState("");

  const handleCityChange = useCallback((city) => {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=93c3ef7ff071b6442b584c7cc7cb23e2&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        const weatherData = {
          city: data.name,
          temp: data.main.temp,
          icon: data.weather[0].icon,
          description: data.weather[0].main,
        };
        setCityWeatherData(weatherData);
      });
  }, []);

  return (
    <section>
      <PickCity action={handleCityChange} />
      {cityWeatherData && <WeatherSummary {...cityWeatherData} />}
      <Loader />
    </section>
  );
};

export default WeatherBox;
