import { Text, View } from 'react-native'
import { styles } from './WeatherConditionStyle'
import React from 'react'
import { Precipitation, Wind, Sunrise, Sunset } from '../Icons'

interface Conditions {
  feelsLike: string
  wind: string
  humidity: string
  high: string
  low: string
  sunrise: any
  sunset: any
}

export default function WeatherCondition({
  feelsLike,
  wind,
  humidity,
  high,
  low,
  sunrise,
  sunset,
}: Conditions) {
  return (
    <View>
      <View style={styles.row}>
        <View style={styles.wind}>
          <Wind size={64} />
          <Text style={{ ...styles.text, fontSize: 20 }}>{wind} km/h</Text>
        </View>
        <View style={styles.wind}>
          <Precipitation size={64} />
          <Text style={{ ...styles.text, fontSize: 20 }}>70%</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={{ ...styles.wind, backgroundColor: '#FAD961' }}>
          <Text style={{ ...styles.text, fontSize: 20 }}>{sunrise}</Text>
          <Sunrise size={48} />
        </View>

        <View style={{ ...styles.wind, backgroundColor: '#0F2027' }}>
          <Sunset size={48} />
          <Text style={{ ...styles.text, fontSize: 20, color: '#FFFFFF' }}>
            {sunset}
          </Text>
        </View>
      </View>
    </View>
  )
}
