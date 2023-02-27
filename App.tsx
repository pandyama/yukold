import React, { useCallback, useEffect, useState } from 'react'

import { StatusBar } from 'expo-status-bar'
import {
  StyleSheet,
  View,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  useWindowDimensions
} from 'react-native'
import CurrentWeather from './components/CurrentWeather/CurrentWeather'
import WeatherCondition from './components/WeatherCondition/WeatherCondition'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { weather } from './api/openweather'

export default function App () {
  const [fontsLoaded] = useFonts({
    'Quicksand-Regular': require('./assets/fonts/Quicksand/Quicksand-Regular.ttf'),
    'RadioCanada-Bold': require('./assets/fonts/RadioCanada/RadioCanada-Bold.ttf'),
    'RadioCanada-Regular': require('./assets/fonts/RadioCanada/RadioCanada-Regular.ttf')
  })

  const [loading, setLoading] = useState(true)
  const [fetchWeather, setFetchWeather]: any = useState(null)

  useEffect(() => {
    weather()
      .then((res: any) => {
        setLoading(false)
        setFetchWeather(res)
      })
      .catch(() => setLoading(true))
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
      {!loading && (
        <View
          style={{
            ...styles.container,
            minHeight: Math.round(windowHeight) - 80
          }}
          onLayout={onLayoutRootView}
        >
          <CurrentWeather
            temperature={fetchWeather?.temp.toString()}
            description={fetchWeather?.description.toString()}
            time={fetchWeather?.time.toString()}
            date={fetchWeather?.date.toString()}
          ></CurrentWeather>
          <View style={styles.search}>
            <TextInput style={styles.textInput} placeholder='Search city' />
          </View>
          <WeatherCondition
            feelsLike={fetchWeather?.feelsLike.toString()}
            wind={fetchWeather?.wind.toString()}
            humidity={fetchWeather?.humidity.toString()}
            high={fetchWeather?.high.toString()}
            low={fetchWeather?.low.toString()}
          ></WeatherCondition>

          <StatusBar style='auto' />
        </View>
      )}
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#449AFF',
    justifyContent: 'flex-start'
  },
  textInput: {
    backgroundColor: '#eff3f9',
    borderRadius: 10,
    padding: 10,
    width: '40%',
    textAlign: 'center',
    fontFamily: 'RadioCanada-Regular',
    fontSize: 20
  },
  search: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10
  }
})
