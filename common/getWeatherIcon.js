const lightSnowCodes = [600, 612, 615, 620]
const heavySnowCodes = [602, 622]
const otherSnowCodes = [601, 611, 613, 616, 621]

const lightRainCodes = [500, 520, 531]
const heavyRainCodes = [502, 503, 504, 522]
const otherRainCodes = [501, 511, 521, 531]

const lightThunderstormCodes = [200, 210, 231]
const heavyThunderstormCodes = [202, 212, 232]
const otherThunderstormCodes = [201, 211, 221, 230]

export default getWeatherIcon = (code) => {
  console.log('🚀 >> code>>', code)

  if (lightThunderstormCodes.includes(code)) {
    return 'lightThunderstorm'
  }
  if (heavyThunderstormCodes.includes(code)) {
    return 'heavyThunderstorm'
  }
  if (otherThunderstormCodes.includes(code)) {
    return 'lightThunderstorm'
  }

  if (lightSnowCodes.includes(code)) {
    return 'lightSnow'
  }
  if (heavySnowCodes.includes(code)) {
    return 'heavySnow'
  }
  if (otherSnowCodes.includes(code)) {
    const num = getRandomNumber()
    if (num === 0) {
      return 'mildSnow'
    }
    return 'lightSnow2'
  }

  if (lightRainCodes.includes(code)) {
    return 'mildRain'
  }
  if (heavyRainCodes.includes(code)) {
    return 'heavyRain'
  }
  if (otherRainCodes.includes(code)) {
    return 'lightRain'
  }
  if (code >= 300 && code < 322) {
    return 'rainy'
  }

  if (code >= 700 && code < 800) {
    return 'clearSunny2'
  }
  if (code > 800) {
    return 'clearSunny3'
  }
  if (code === 800) return 'clearSunny'
}
