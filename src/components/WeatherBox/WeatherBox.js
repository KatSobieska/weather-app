import PickCity from "../PickCity/PickCity";
import WeatherSummary from "../WeatherSummary/WeatherSummary";
import Loader from "../Loader/Loader";
import { useCallback } from "react";

const WeatherBox = () => {
  const handleCityChange = useCallback((city) => {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=93c3ef7ff071b6442b584c7cc7cb23e2&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }, []);

  return (
    <section>
      <PickCity action={handleCityChange} />
      <WeatherSummary />
      <Loader />
    </section>
  );
};

export default WeatherBox;
