import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Image } from 'react-native'
import { styles } from './CurrentWeatherStyle'
import CurrentTime from '../CurrentTime/CurrentTime'

interface Weather {
  temperature: string
  description: string
  time: string
  date: string
  city: string
}

export default function CurrentWeather ({
  temperature,
  description,
  time,
  date,
  city
}: Weather) {
  return (
    <View style={styles.card}>
      <View style={styles.city}>
        <Text style={styles.text}>{city}</Text>
        <CurrentTime time={time} date={date}></CurrentTime>
      </View>
      <View>
        <Image
          source={require('../../assets/weather/weather-icon.png')}
          style={{ width: 140, height: 100 }}
        />
      </View>
      <View style={styles.currentTemp}>
        <Text style={styles.text}>{temperature} &deg;C</Text>
      </View>
      <View style={styles.weatherDescription}>
        <Text style={styles.descText}>{description?.toLocaleUpperCase()}</Text>
      </View>
    </View>
  )
}
