import PickCity from "../PickCity/PickCity";
import WeatherSummary from "../WeatherSummary/WeatherSummary";
import Loader from "../Loader/Loader";
import { useCallback, useState } from "react";
import ErrorBox from "../ErrorBox/ErrorBox";

const WeatherBox = () => {
  const [cityWeatherData, setCityWeatherData] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);

  const handleCityChange = useCallback((city) => {
    setPending(true);
    setError(false);
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=93c3ef7ff071b6442b584c7cc7cb23e2&units=metric`
    ).then((res) => {
      if (res.status === 200) {
        return res.json().then((data) => {
          const weatherData = {
            city: data.name,
            temp: data.main.temp,
            icon: data.weather[0].icon,
            description: data.weather[0].main,
          };
          setCityWeatherData(weatherData);
          setPending(false);
        });
      } else {
        alert("ERROR!");
        setError(true);
      }
    });
  }, []);

  return (
    <section>
      <PickCity action={handleCityChange} />
      {cityWeatherData && <WeatherSummary {...cityWeatherData} />}
      {pending && <Loader />}
      {error && <ErrorBox />}
    </section>
  );
};

export default WeatherBox;
