import axios from "axios";
import moment from "moment";
import Constants from "expo-constants";

const lightSnowCodes = [600, 612, 615, 620];
const heavySnowCodes = [602, 622];
const otherSnowCodes = [601, 611, 613, 616, 621];

const lightRainCodes = [500, 520, 531];
const heavyRainCodes = [502, 503, 504, 522];
const otherRainCodes = [501, 511, 521, 531];

const lightThunderstormCodes = [200, 210, 231];
const heavyThunderstormCodes = [202, 212, 232];
const otherThunderstormCodes = [201, 211, 221, 230];

const getRandomNumber = () => Math.floor(Math.random() * 2);

const getWeatherIcon = (code) => {
  if (lightThunderstormCodes.includes(code)) {
    return "lightThunderstorm";
  }
  if (heavyThunderstormCodes.includes(code)) {
    return "heavyThunderstorm";
  }
  if (otherThunderstormCodes.includes(code)) {
    return "lightThunderstorm";
  }

  if (lightSnowCodes.includes(code)) {
    return "lightSnow";
  }
  if (heavySnowCodes.includes(code)) {
    return "heavySnow";
  }
  if (otherSnowCodes.includes(code)) {
    const num = getRandomNumber();
    if (num === 0) {
      return "mildSnow";
    }
    return "lightSnow2";
  }

  if (lightRainCodes.includes(code)) {
    return "mildRain";
  }
  if (heavyRainCodes.includes(code)) {
    return "heavyRain";
  }
  if (otherRainCodes.includes(code)) {
    return "lightRain";
  }
  if (code >= 300 && code < 322) {
    return "rainy";
  }

  if (code >= 700 && code < 800) {
    return "clearSunny2";
  }
  if (code > 800) {
    const num = getRandomNumber();
    if (num === 0) {
      return "clearSunny";
    }
    return "clearSunny3";
  }
};

//TODO: if an invalid city is searched

export const weather = async (city, lat, lon) => {
  const key = Constants.expoConfig.extra.API_KEY;
  let test;

  if (lat && lon) {
    try {
      test = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`
      );
    } catch (e) {
      return;
    }
  } else if (city) {
    try {
      test = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`
      );
    } catch (e) {
      return;
    }
  }

  const utc = moment();
  let localTimeOffset;
  let localTimeStamp;
  let localDate;
  let localTime;

  if (test.data.timezone < 0) {
    localTimeOffset = test.data.timezone / 3600;
    localTimeStamp = moment
      .utc(utc)
      .subtract(Math.abs(localTimeOffset), "hours");

    localDate = moment(localTimeStamp).format("MMMM DD");
    localTime = moment(localTimeStamp).format("hh:mm A");
  } else {
    localTimeOffset = test.data.timezone / 3600;
    localTimeStamp = moment.utc(utc).add(Math.abs(localTimeOffset), "hours");

    localDate = moment(localTimeStamp).format("MMMM DD");
    localTime = moment(localTimeStamp).format("hh:mm A");
  }

  const weatherCode = test.data.weather[0].id;
  console.log("🚀 ~ file: index.js:113 ~ weather ~ weatherCode:", weatherCode);
  const icon =
    moment(localTimeStamp).hour() > 7 && moment(localTimeStamp).hour() < 19
      ? getWeatherIcon(weatherCode)
      : "sleeping";

  console.log("🚀 ~ file: index.js:114 ~ weather ~ icon:", icon);

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
    icon,
  };
  return weatherStat;
};
