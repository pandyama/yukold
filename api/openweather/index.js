import axios from "axios";
import moment from "moment";

export const weather = async (city, lat, lon) => {
  let test;

  if (lat && lon) {
    try {
      test = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=0fe37647bf3c4095418a1c5392bb60c`
      );
    } catch (e) {
      test = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=Calgary&units=metric&appid=0fe37647bf3c4095418a1c5392bb60c`
      );
    }
  } else if (city) {
    try {
      test = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=0fe37647bf3c4095418a1c5392bb60c`
      );
    } catch (e) {
      test = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=Calgary&units=metric&appid=0fe37647bf3c4095418a1c5392bb60c`
      );
    }
  }

  const utc = moment();
  const localTimeOffset = test.data.timezone / 3600;
  const localTimeStamp = moment
    .utc(utc)
    .subtract(Math.abs(localTimeOffset), "hours");

  const localDate = moment(localTimeStamp).format("MM-DD-YYYY");
  const localTime = moment(localTimeStamp).format("hh:mm A");

  const weatherStat = {
    cityName: test.data.name,
    description: test.data.weather[0].description,
    temp: ~~test.data.main.temp,
    high: ~~test.data.main.temp_max,
    low: ~~test.data.main.temp_min,
    feelsLike: ~~test.data.main.feels_like,
    sunrise: test.data.sys.sunrise,
    sunset: test.data.sys.sunset,
    wind: ~~test.data.wind.speed,
    humidity: ~~test.data.main.humidity,
    time: localTime,
    date: localDate,
  };
  return weatherStat;
};
