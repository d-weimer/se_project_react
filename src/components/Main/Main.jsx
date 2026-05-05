import { useContext } from "react";

import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard.jsx";
import ItemCard from "../ItemCard/ItemCard.jsx";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.jsx";

function Main({
  weatherData,
  handleCardClick,
  clothingItems,
  isWeatherDataLoaded,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const filteredItems = clothingItems.filter((item) => {
    return item.weather === weatherData.type;
  });

  const isMultiRow = filteredItems.length > 4;
  const listClassName = `cards__list ${isMultiRow ? "cards__list_rows_multi" : "cards__list_rows_single"}`;

  return (
    <main>
      <WeatherCard
        weatherData={weatherData}
        isWeatherDataLoaded={isWeatherDataLoaded}
      />
      <section className="cards">
        <p className="cards__text">
          Today is{" "}
          {isWeatherDataLoaded
            ? `${
                currentTemperatureUnit === "F"
                  ? weatherData.temp.fahrenheit
                  : weatherData.temp.celcius
              }°${currentTemperatureUnit}`
            : " "}{" "}
          / You may want to wear:
        </p>
        <ul className={listClassName}>
          {filteredItems.map((item) => {
            return (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={handleCardClick}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
