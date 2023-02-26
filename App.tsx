import React, { useCallback, useEffect, useState } from 'react'

import { StatusBar } from 'expo-status-bar'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  SafeAreaView,
  useWindowDimensions
} from 'react-native'
import CurrentWeather from './components/CurrentWeather/CurrentWeather'
import WeatherCondition from './components/WeatherCondition/WeatherCondition'
import CurrentTime from './components/CurrentTime/CurrentTime'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { weather } from './api/openweather'

export default function App () {
  const [fontsLoaded] = useFonts({
    'Quicksand-Regular': require('./assets/fonts/Quicksand-Regular.ttf')
  })

  let cityWeather

  useEffect(() => {
    cityWeather = weather()
  }, [])

  const windowHeight = useWindowDimensions().height

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }

  return (
    <KeyboardAvoidingView
      contentContainerStyle={{ flexGrow: 1 }}
      style={{
        flex: 1
      }}
      enabled
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.select({
        ios: 0,
        android: 500
      })}
    >
      {/* // <SafeAreaView style={{ flex: 1 }}> */}
      <View
        style={{
          ...styles.container,
          minHeight: Math.round(windowHeight) - 80
        }}
        onLayout={onLayoutRootView}
      >
        <CurrentWeather></CurrentWeather>

        <View style={styles.search}>
          <TextInput style={styles.textInput} placeholder='Search city' />
        </View>
        <CurrentTime></CurrentTime>
        <WeatherCondition></WeatherCondition>

        <StatusBar style='auto' />
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#449AFF',
    // alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  textInput: {
    backgroundColor: '#eff3f9',
    borderRadius: 10,
    padding: 10,
    width: '40%',
    textAlign: 'center',
    fontFamily: 'Quicksand-Regular',
    fontSize: 20
  },
  search: {
    width: '100%',
    // height: '40%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10
    // borderWidth: 2
  }
})
