import React from 'react';
import {StyleSheet, Text, View, Image, ActivityIndicator} from 'react-native';
import ParqLogo from '../resources/logo/parqdino.png';

const LoadingView = () => {
  return (
    <View style={styles.screen}>
      <Image style={styles.image} source={ParqLogo} />
      <ActivityIndicator />
    </View>
  );
};

export default LoadingView;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#11a4ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    alignItems: 'center',
    alignContent: 'center',
    width: 200,
    height: 262,
  },
});
