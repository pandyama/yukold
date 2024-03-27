import React, { useCallback, useEffect, useState } from "react";

import { StatusBar } from "expo-status-bar";
import {
  Alert,
  StyleSheet,
  View,
  TextInput,
  Image,
  Platform,
  KeyboardAvoidingView,
  useWindowDimensions,
} from "react-native";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import WeatherCondition from "./components/WeatherCondition/WeatherCondition";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as Location from "expo-location";
import { weather } from "./api/openweather";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Quicksand-Regular": require("./assets/fonts/Quicksand/Quicksand-Regular.ttf"),
    "RadioCanada-Bold": require("./assets/fonts/RadioCanada/RadioCanada-Bold.ttf"),
    "RadioCanada-Regular": require("./assets/fonts/RadioCanada/RadioCanada-Regular.ttf"),
  });

  const [loading, setLoading] = useState(true);
  const [fetchWeather, setFetchWeather]: any = useState(false);
  const [cityWeather, setWeather]: any = useState(null);
  const [value, onChangeText] = useState("");
  const [location, setLocation]: any = useState();

  const cityNotFoundAlert = () =>
    Alert.alert(`Sorry, I couldn't find that`, "", [
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);

  const getWeather = (
    city?: string | null,
    lat?: number | null,
    lon?: number | null
  ) => {
    setLoading(true);
    weather(city, lat, lon).then((res: any) => {
      if (res.success === false) {
        setLoading(false);
        setFetchWeather(false);
        cityNotFoundAlert();
      } else {
        setLoading(false);
        setFetchWeather(true);
        setWeather(res.data);
      }
    });
  };

  useEffect(() => {
    const getData = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setLoading(false);
          setFetchWeather(false);
          return;
        }

        const loc = await Location.getCurrentPositionAsync({});
        setLocation(loc);
        getWeather("Calgary", loc.coords.latitude, loc.coords.longitude);
      } catch (e) {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const windowHeight = useWindowDimensions().height;

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  if (loading) {
    return (
      <View style={styles.card}>
        <View style={styles.currentTemp}>
          <Image
            source={require("./assets/weather/no-permission.png")}
            style={{
              resizeMode: "contain",
              flex: 1,
              width: 250,
              height: 250,
            }}
          />
        </View>
      </View>
    );
  }

  return (
    <>
      <KeyboardAvoidingView
        contentContainerStyle={{ flexGrow: 1 }}
        style={{
          flexGrow: 1,
          height: "100%",
        }}
        enabled
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.select({
          ios: 0,
          android: 150,
        })}
      >
        {!loading && fetchWeather && (
          <View style={styles.search}>
            <TextInput
              keyboardType="default"
              style={styles.textInput}
              placeholder="Search city"
              onSubmitEditing={() => getWeather(value)}
              onChangeText={onChangeText}
            />
          </View>
        )}

        {!loading && !fetchWeather && (
          <View style={styles.search}>
            <TextInput
              keyboardType="default"
              style={styles.textInput}
              placeholder='Try "Oymyakon"'
              onSubmitEditing={() => getWeather(value)}
              onChangeText={onChangeText}
            />
            <View>
              <Image
                source={require("./assets/weather/solar-system.png")}
                style={{
                  resizeMode: "contain",
                  flex: 1,
                  width: 250,
                  height: 250,
                }}
              />
            </View>
            <StatusBar style="auto" />
          </View>
        )}

        {!loading && fetchWeather && (
          <View
            style={{
              ...styles.container,
              minHeight: Math.round(windowHeight) - 80,
            }}
            onLayout={onLayoutRootView}
          >
            <CurrentWeather
              temperature={cityWeather?.temp.toString()}
              description={cityWeather?.description.toString()}
              time={cityWeather?.time.toString()}
              date={cityWeather?.date.toString()}
              city={cityWeather?.cityName.toString()}
              icon={cityWeather?.icon}
            ></CurrentWeather>

            <WeatherCondition
              feelsLike={cityWeather?.feelsLike.toString()}
              wind={cityWeather?.wind.toString()}
              humidity={cityWeather?.humidity.toString()}
              high={cityWeather?.high.toString()}
              low={cityWeather?.low.toString()}
            ></WeatherCondition>

            <StatusBar style="auto" />
          </View>
        )}
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#449AFF",
    justifyContent: "flex-start",
  },
  textInput: {
    backgroundColor: "#eff3f9",
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    width: "100%",
    textAlign: "center",
    fontFamily: "RadioCanada-Regular",
    fontSize: 20,
  },
  search: {
    backgroundColor: "#eff3f9",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 47,
    paddingRight: 7,
    paddingLeft: 7,
  },
  card: {
    backgroundColor: "#eff3f9",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  currentTemp: {
    padding: 15,
  },
  weatherDescription: {
    padding: 5,
  },
  text: {
    fontSize: 40,
    color: "black",
    fontFamily: "RadioCanada-Regular",
  },
  icon: { width: "25%", height: "25%" },
});
