import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Image } from 'react-native'
import { styles } from './WeatherConditionStyle'

interface Conditions {
  feelsLike: string
  wind: string
  humidity: string
  high: string
  low: string
}

export default function WeatherCondition ({
  feelsLike,
  wind,
  humidity,
  high,
  low
}: Conditions) {
  return (
    <View>
      <View style={styles.row}>
        <View style={styles.city}>
          <Text style={{ ...styles.text, fontSize: 27, color: 'black' }}>
            Feels Like
          </Text>
          <Text style={{ ...styles.text, fontSize: 22 }}>
            {feelsLike} &deg;C
          </Text>
        </View>
        <View style={styles.city}>
          <Text style={{ ...styles.text, fontSize: 27, color: 'black' }}>
            Wind
          </Text>
          <Text style={{ ...styles.text, fontSize: 22 }}>{wind} km/h</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.city}>
          <Text style={{ ...styles.text, fontSize: 27, color: 'black' }}>
            Day High
          </Text>
          <Text style={{ ...styles.text, fontSize: 22 }}>{high} &deg;C</Text>
        </View>
        <View style={styles.city}>
          <Text style={{ ...styles.text, fontSize: 27, color: 'black' }}>
            Day Low
          </Text>
          <Text style={{ ...styles.text, fontSize: 22 }}>{low} &deg;C</Text>
        </View>
        {/* <View style={styles.city}>
          <Text style={{ ...styles.text, fontSize: 27, color: 'black' }}>
            Precipitation
          </Text>
          <Text style={{ ...styles.text, fontSize: 22 }}>70%</Text>
        </View>
        <View style={styles.city}>
          <Text style={{ ...styles.text, fontSize: 27, color: 'black' }}>
            Humidity
          </Text>
          <Text style={{ ...styles.text, fontSize: 22 }}>{humidity}%</Text>
        </View> */}
      </View>
    </View>
  )
}
