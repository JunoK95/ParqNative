import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import LottieView from 'lottie-react-native';

export default function LottieLoading() {
  return (
    <View style={styles.bg}>
      <LottieView
        style={styles.lottieContainer}
        source={require('../../resources/animations/map-location.json')}
        autoPlay
        loop
      />
      <Text style={styles.loadTitle}>Finding Nearby Parking</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffc630',
  },
  lottieContainer: {
    width: '80%',
  },
  loadTitle: {
    fontSize: 20,
    paddingVertical: 32,
    fontWeight: '600',
    fontFamily: 'Montserrat-Medium',
    color: '#000',
  },
});
