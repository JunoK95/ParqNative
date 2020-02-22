import React from 'react';
import {View, StyleSheet} from 'react-native';
import OpenDrawerButton from '../navigation/OpenDrawerButton';

const DrawerHeaderPadding = () => {
  return (
    <View style={styles.header}>
      <OpenDrawerButton />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 56,
    marginTop: 12,
    position: 'absolute',
    zIndex: 5,
    paddingLeft: 24,
  },
});

export default DrawerHeaderPadding;
