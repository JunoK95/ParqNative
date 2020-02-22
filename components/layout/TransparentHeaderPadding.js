import React from 'react';
import BackToButton from '../navigation/BackToButton';
import {View, StyleSheet} from 'react-native';

const TransparentHeaderPadding = props => {
  return (
    <View style={styles.header}>
      <BackToButton navigation={props.navigation} to={props.to} />
    </View>
  );
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
});

export default TransparentHeaderPadding;
