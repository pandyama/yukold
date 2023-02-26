import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Image } from 'react-native'
import { styles } from './CurrentTimeStyle'

export default function CurrentTime () {
  return (
    <View style={styles.card}>
      <Text style={{ ...styles.text }}>Feb 26 - 9:45 AM</Text>
    </View>
  )
}
