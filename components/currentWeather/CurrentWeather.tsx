import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Image } from 'react-native'
import { styles } from './CurrentWeatherStyle'
import CurrentTime from '../CurrentTime/CurrentTime'
import imageAssets from '../../imageAssets'

interface Weather {
  temperature: string
  description: string
  time: string
  date: string
  city: string
  icon: string
}

export default function CurrentWeather ({
  temperature,
  description,
  time,
  date,
  city,
  icon
}: Weather) {
  return (
    <View style={styles.card}>
      <View style={styles.city}>
        <Text style={styles.text}>{city}</Text>
        <CurrentTime time={time} date={date}></CurrentTime>
      </View>
      <View style={styles.icon}>
        <Image
          source={imageAssets.rainy}
          style={{ resizeMode: 'center', width: '100%', height: '100%' }}
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
