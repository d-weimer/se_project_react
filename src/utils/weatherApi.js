const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

export const getWeather = ({ latitude, longitude }, APIkey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`,
  ).then(handleServerResponse);
};

export const filterWeatherData = (data) => {
  const result = {};
  result.temp = {
    fahrenheit: Math.round(data.main.temp),
    celcius: Math.round(((data.main.temp - 32) * 5) / 9),
  };
  result.city = data.name;
  result.type = getWeatherCondition(result.temp.fahrenheit);
  result.condition = data.weather[0].main.toLowerCase();
  result.isDay = isDay(data.sys, Date.now());

  return result;
};

const isDay = ({ sunrise, sunset }, now) => {
  return sunrise * 1000 < now && now < sunset * 1000;
};

const getWeatherCondition = (temperature) => {
  if (temperature >= 86) {
    return "hot";
  } else if (temperature >= 66) {
    return "warm";
  } else {
    return "cold";
  }
};
