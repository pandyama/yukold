import axios from "axios";
import moment from "moment";
import Constants from "expo-constants";

const { getWeatherIcon, getLocalTimeAndDate } = require("../../common/util");

export const weather = async (city, lat, lon) => {
  const key = Constants.expoConfig.extra.API_KEY;
  let apiResponse;

  if (lat && lon) {
    try {
      apiResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`
      );
    } catch (e) {
      return { success: false };
    }
  } else if (city) {
    try {
      apiResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`
      );
    } catch (e) {
      return { success: false };
    }
  }

  const {
    date: localDate,
    time: localTime,
    timestamp: localTimeStamp,
  } = getLocalTimeAndDate(apiResponse.data.timezone);

  const weatherCode = apiResponse.data.weather[0].id;
  const icon =
    moment(localTimeStamp).hour() > 6 && moment(localTimeStamp).hour() < 19
      ? getWeatherIcon(weatherCode)
      : "sleeping";

  const weatherStat = {
    cityName: apiResponse.data.name,
    description: apiResponse.data.weather[0].description,
    temp: ~~apiResponse.data.main.temp,
    high: ~~apiResponse.data.main.temp_max,
    low: ~~apiResponse.data.main.temp_min,
    feelsLike: ~~apiResponse.data.main.feels_like,
    sunrise: apiResponse.data.sys.sunrise,
    sunset: apiResponse.data.sys.sunset,
    wind: ~~apiResponse.data.wind.speed,
    humidity: ~~apiResponse.data.main.humidity,
    time: localTime,
    date: localDate,
    icon,
  };
  return { data: weatherStat, success: true };
};
