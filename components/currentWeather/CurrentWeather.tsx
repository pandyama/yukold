import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Image } from 'react-native'
import { styles } from './CurrentWeatherStyle'

export default function CurrentWeather () {
  return (
    <View style={styles.card}>
      <View style={styles.city}>
        <Text style={styles.text}>Calgary</Text>
      </View>
      <View>
        <Image
          source={require('../../assets/weather/weather-icon.png')}
          style={{ width: 140, height: 100 }}
        />
      </View>
      <View style={styles.currentTemp}>
        <Text style={styles.text}>35 &deg;C</Text>
      </View>
      <View style={styles.weatherDescription}>
        <Text style={styles.descText}>Light flurries</Text>
      </View>
    </View>
  )
}
