import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginTop: 10,
    gap: 15, // adds spacing between children
    paddingHorizontal: 16, // 👈 moves the whole row inward
  },
  wind: {
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    flex: 1,
    aspectRatio: 1,
    backgroundColor: '#C2E9FB',
  },
  text: {
    fontFamily: 'RadioCanada-Regular',
    color: 'black',
  },
})
