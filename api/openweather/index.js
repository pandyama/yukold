import axios from 'axios'
import moment from 'moment'
import Constants from 'expo-constants'
import { getWeatherIcon } from '../../common'
const countriesList = require('./countries.json')

const { getLocalTimeAndDate } = require('../../common/util')

export const weather = async (city, lat, lon) => {
  // const key = Constants.expoConfig.extra.API_KEY
  const key = '0fe37647bf3c4095418a1c5392bb60cc'
  let apiResponse
  let geoApiResponse

  if (lat && lon) {
    try {
      apiResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`
      )
      geoApiResponse = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${key}`
      )
    } catch (e) {
      return { success: false }
    }
  } else if (city) {
    try {
      apiResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`
      )

      geoApiResponse = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${key}`
      )
    } catch (e) {
      return { success: false }
    }
  }

  const {
    date: localDate,
    time: localTime,
    timestamp: localTimeStamp,
  } = getLocalTimeAndDate(apiResponse.data.timezone)

  let sunriseMoment
  sunriseMoment = moment.unix(apiResponse.data.sys.sunrise)
  sunriseMoment = sunriseMoment.utcOffset(apiResponse.data.timezone / 3600)
  const formattedSunriseTime = sunriseMoment.format('hh:mm A')

  let sunsetMoment
  sunsetMoment = moment.unix(apiResponse.data.sys.sunset)
  sunsetMoment = sunsetMoment.utcOffset(apiResponse.data.timezone / 3600)
  const formattedSunsetTime = sunsetMoment.format('hh:mm A')

  console.log('🚀 >> weather >> formattedSunsetTime>>', formattedSunsetTime)

  const weatherCode = apiResponse.data.weather[0].id
  const icon =
    moment(localTimeStamp).hour() > 6 && moment(localTimeStamp).hour() < 19
      ? getWeatherIcon(weatherCode)
      : 'sleeping'

  const countryName = countriesList.filter(
    (item) => item.code === geoApiResponse.data[0].country
  )

  const weatherStat = {
    cityName: apiResponse.data.name,
    country: countryName[0].name,
    description: apiResponse.data.weather[0].description,
    temp: ~~apiResponse.data.main.temp,
    high: ~~apiResponse.data.main.temp_max,
    low: ~~apiResponse.data.main.temp_min,
    feelsLike: ~~apiResponse.data.main.feels_like,
    sunrise: formattedSunriseTime,
    sunset: formattedSunsetTime,
    wind: ~~apiResponse.data.wind.speed,
    humidity: ~~apiResponse.data.main.humidity,
    time: localTime,
    date: localDate,
    icon,
  }
  return { data: weatherStat, success: true }
}
