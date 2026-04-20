import "./WeatherCard.css";
import daySunny from "../../assets/day-sunny.png";

function WeatherCard({ weatherData }) {
  return (
    <section className="weather-card">
      <p className="weather-card__temp">{weatherData.temp.F}&deg;F</p>
      <img className="weather-card__image" src={daySunny} alt="sunny" />
    </section>
  );
}

export default WeatherCard;
