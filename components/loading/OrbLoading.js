import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import LottieView from 'lottie-react-native';

export default function OrbLoading({bgcolor}) {
  return (
    <View style={{...styles.bg, backgroundColor: bgcolor}}>
      <LottieView
        style={styles.lottieContainer}
        source={require('../../resources/animations/BlueYellowOrb.json')}
        autoPlay
        loop
      />
      {/* <LottieView
        style={styles.lottieContainer}
        source={require('../../resources/animations/Best_5.json')}
        autoPlay
        loop
      /> */}
      <Text style={styles.loadTitle}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#11a4ff',
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
