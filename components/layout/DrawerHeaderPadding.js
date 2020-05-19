import React from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import OpenDrawerButton from '../navigation/OpenDrawerButton';

const DrawerHeaderPadding = () => {
  if (Platform.OS === 'ios') {
    return (
      <View style={styles.iosheader}>
        <OpenDrawerButton />
      </View>
    );
  } else {
    return (
      <View style={styles.header}>
        <OpenDrawerButton />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  header: {
    height: 56,
    marginTop: 12,
    position: 'absolute',
    zIndex: 5,
    paddingLeft: 24,
  },
  iosheader: {
    display: 'none',
    height: 68,
    marginTop: 12,
    position: 'absolute',
    zIndex: 5,
    paddingTop: 42,
    paddingLeft: 24,
  },
});

export default DrawerHeaderPadding;
