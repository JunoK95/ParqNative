import React from 'react';
import BackToButton from '../navigation/BackToButton';
import {View, StyleSheet, Platform} from 'react-native';

const TransparentHeaderPadding = props => {
  if (Platform.OS === 'ios') {
    return (
      <View style={styles.iosheader}>
        <BackToButton navigation={props.navigation} to={props.to} />
      </View>
    );
  } else {
    return (
      <View style={styles.header}>
        <BackToButton navigation={props.navigation} to={props.to} />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  header: {
    height: 56,
    top: 0,
    zIndex: 5,
    paddingLeft: 24,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
    position: 'absolute',
  },
  iosheader: {
    height: 68,
    marginTop: 12,
    position: 'absolute',
    zIndex: 5,
    paddingTop: 42,
    paddingLeft: 24,
  },
});

export default TransparentHeaderPadding;
