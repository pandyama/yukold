import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Image } from 'react-native'
import { styles } from './CurrentTimeStyle'

interface Time {
  time: string
  date: string
}

export default function CurrentTime ({ time, date }: Time) {
  return (
    <View style={styles.card}>
      <Text style={{ ...styles.text }}>{time}</Text>
    </View>
  )
}
