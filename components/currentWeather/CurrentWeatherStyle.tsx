import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  card: {
    // borderRadius: 5,
    // boxShadow: '0 2px 30px rgba(black, 0.2)',
    backgroundColor: '#eff3f9',
    height: '60%',
    alignItems: 'center',
    justifyContent: 'space-around'
    // borderWidth: 1
    // margin: 5
  },
  currentTemp: { borderWidth: 1, borderRadius: 10, padding: 10 },
  weatherDescription: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10
    // margin: 5
  },
  city: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 15,
    // position: 'absolute',
    // top: 0,
    // left: 0,
    width: '100%'
  },
  text: {
    fontSize: 40,
    fontFamily: 'Quicksand-Regular'
  },
  descText: {
    fontSize: 30,
    fontFamily: 'Quicksand-Regular'
  }
})
