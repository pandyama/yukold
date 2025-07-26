import { Text, View, Image } from 'react-native'
import { styles } from './CurrentWeatherStyle'
import CurrentTime from '../CurrentTime/CurrentTime'
import imageAssets from '../../imageAssets'
import React from 'react'

interface Weather {
  temperature: string
  description: string
  time: string
  date: string
  city: string
  country: string
  icon: string
  high: string
  low: string
}

type T = keyof typeof imageAssets

export default function CurrentWeather({
  temperature,
  description,
  time,
  date,
  city,
  high,
  low,
  country,
  icon,
}: Weather) {
  return (
    <View style={styles.card}>
      <View style={styles.city}>
        <Text style={styles.text}>
          {city}, {country}
        </Text>
        <CurrentTime time={time} date={date} />
      </View>
      <View style={styles.icon}>
        <Image
          source={imageAssets[icon as T]}
          style={{ resizeMode: 'center', width: '100%', height: '100%' }}
        />
      </View>
      <View style={styles.currentTemp}>
        <Text style={styles.currentTempText}>{temperature} &deg;C</Text>
      </View>
      <View style={styles.currentTemp}>
        <Text style={styles.text}>
          High: {high} &deg;C &nbsp; Low: {low} &deg;C
        </Text>
      </View>
      <View style={styles.weatherDescription}>
        <Text style={styles.descText}>{description}</Text>
      </View>
    </View>
  )
}
