import React, { useCallback, useEffect, useState } from 'react'

import { StatusBar } from 'expo-status-bar'
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Platform,
  KeyboardAvoidingView,
  useWindowDimensions,
  PermissionsAndroid
} from 'react-native'
import CurrentWeather from './components/CurrentWeather/CurrentWeather'
import WeatherCondition from './components/WeatherCondition/WeatherCondition'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import * as Location from 'expo-location'
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
  const [value, onChangeText] = useState('')
  const [location, setLocation]: any = useState()
  const [errorMsg, setErrorMsg] = useState('')

  const getWeather = (
    city?: string | null,
    lat?: number | null,
    lon?: number | null
  ) => {
    setLoading(true)
    weather(city, lat, lon).then((res: any) => {
      setLoading(false)
      setFetchWeather(res)
      // onChangeText('')
    })
    // .catch(() => weather('Calgary', null, null))
  }

  useEffect(() => {
    const getData = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        getWeather('Calgary', null, null)
        setErrorMsg('Permission to access location was denied')
        return
      }
      const loc = await Location.getCurrentPositionAsync({})
      setLocation(loc)
      getWeather('Calgary', loc.coords.latitude, loc.coords.longitude)
    }
    getData()
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

  if (loading) {
    return (
      <View style={styles.card}>
        <View style={styles.currentTemp}>
          <Text style={styles.text}>Scanning 🌩</Text>
        </View>
      </View>
    )
  }

  return (
    <>
      <KeyboardAvoidingView
        contentContainerStyle={{ flexGrow: 1 }}
        style={{
          flex: 1
        }}
        enabled
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.select({
          ios: 0,
          android: 150
        })}
      >
        <View style={styles.search}>
          <TextInput
            keyboardType='default'
            style={styles.textInput}
            placeholder='Search city'
            onSubmitEditing={() => getWeather(value)}
            onChangeText={onChangeText}
          />
        </View>

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
              city={fetchWeather?.cityName.toString()}
              icon={fetchWeather?.icon}
            ></CurrentWeather>

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
    </>
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
    borderWidth: 1,
    padding: 10,
    width: '100%',
    textAlign: 'center',
    fontFamily: 'RadioCanada-Regular',
    fontSize: 20
  },
  search: {
    backgroundColor: '#eff3f9',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 47,
    paddingRight: 7,
    paddingLeft: 7
  },
  card: {
    backgroundColor: '#eff3f9',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  currentTemp: {
    padding: 15
  },
  weatherDescription: {
    padding: 5
  },
  text: {
    fontSize: 40,
    color: 'black',
    fontFamily: 'RadioCanada-Regular'
  }
})
