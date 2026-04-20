import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard.jsx";
import ItemCard from "../ItemCard/ItemCard.jsx";

function Main({ weatherData, handleCardClick, clothingItems }) {
  const filteredItems = clothingItems.filter((item) => {
    return item.weather === weatherData.type;
  });

  const isMultiRow = filteredItems.length > 4;
  const listClassName = `cards__list ${isMultiRow ? "cards__list_rows_multi" : "cards__list_rows_single"}`;

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp.fahrenheit}&deg; F / You may want to wear:
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
