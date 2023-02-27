import axios from 'axios'
import moment from 'moment'

export const weather = async () => {
  const city = 'Calgary'
  const test = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=0fe37647bf3c4095418a1c5392bb60cc`
  )
  console.log('🚀 ~ file: index.tsx:8 ~ weather ~ test:', test.data)

  const utc = moment()
  console.log('🚀 ~ file: index.tsx:12 ~ weather ~ utc:', utc)
  const localTimeOffset = test.data.timezone / 3600
  const localTimeStamp = moment
    .utc(utc)
    .subtract(Math.abs(localTimeOffset), 'hours')
  // console.log('🚀 ~ file: index.tsx:14 ~ weather ~ localTime:', localTimeStamp)

  const localDate = moment(localTimeStamp).format('MM-DD-YYYY')
  console.log('🚀 ~ file: index.tsx:20 ~ weather ~ localDate:', localDate)
  const localTime = moment(localTimeStamp).format('hh:mm A')
  console.log('🚀 ~ file: index.tsx:22 ~ weather ~ localTime:', localTime)

  const weatherStat = {
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
    date: localDate
  }
  return weatherStat
}
