import { useContext } from "react";

import "./WeatherCard.css";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTempatureUnitContext.jsx";
import {
  defaultWeatherOptions,
  weatherOptions,
} from "../../utils/constants.js";

function WeatherCard({ weatherData, isWeatherDataLoaded }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  let weatherOption;
  if (filteredOptions.length === 0) {
    weatherOption = defaultWeatherOptions[weatherData.isDay ? "day" : "night"];
  } else {
    weatherOption = filteredOptions[0];
  }

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {isWeatherDataLoaded ? (
          <>
            {currentTemperatureUnit === "F"
              ? weatherData.temp.fahrenheit
              : weatherData.temp.celcius}
            &deg;{currentTemperatureUnit}
          </>
        ) : (
          " "
        )}
      </p>
      <img
        className="weather-card__image"
        src={weatherOption?.url}
        alt={`Card showing ${weatherOption?.day ? "day" : "night"}time ${weatherOption?.condition} weather`}
      />
    </section>
  );
}

export default WeatherCard;
