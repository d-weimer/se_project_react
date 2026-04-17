import "./WeatherCard.css";
import daySunny from "../../assets/day-sunny.png";

function WeatherCard() {
  return (
    <section className="weather-card">
      <p className="weather-card__temp">75&deg;F</p>
      <img className="weather-card__image" src={daySunny} alt="sunny" />
    </section>
  );
}

export default WeatherCard;
