import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Image } from 'react-native'
import { styles } from './WeatherConditionStyle'

export default function WeatherCondition () {
  return (
    <View>
      <View style={styles.row}>
        <View style={styles.city}>
          <Text style={{ ...styles.text, fontSize: 25 }}>Feels Like</Text>
          <Text style={{ ...styles.text, fontSize: 20 }}>42</Text>
        </View>
        <View style={styles.city}>
          <Text style={{ ...styles.text, fontSize: 25 }}>Wind</Text>
          <Text style={{ ...styles.text, fontSize: 20 }}>24 km/h</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.city}>
          <Text style={{ ...styles.text, fontSize: 25 }}>Precipitation</Text>
          <Text style={{ ...styles.text, fontSize: 20 }}>70%</Text>
        </View>
        <View style={styles.city}>
          <Text style={{ ...styles.text, fontSize: 25 }}>Humidity</Text>
          <Text style={{ ...styles.text, fontSize: 20 }}>95%</Text>
        </View>
      </View>
    </View>
  )
}
