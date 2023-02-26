import axios from 'axios'

export const weather = async () => {
  const city = 'Calgary'
  const test = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=0fe37647bf3c4095418a1c5392bb60cc`
  )
  console.log('🚀 ~ file: index.tsx:8 ~ weather ~ test:', test.data)

  const weatherStat = {
    temp: test.data.main.temp,
    high: test.data.main.temp_max,
    low: test.data.main.temp_min,
    sunrise: test.data.sys.sunrise,
    sunset: test.data.sys.sunset,
    wind: test.data.wind.speed
  }

  return weatherStat
}
