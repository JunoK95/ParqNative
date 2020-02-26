import React from 'react';
import BackToButton from '../navigation/BackToButton';
import {View, Text, StyleSheet} from 'react-native';

const HeaderPadding = props => {
  return (
    <View style={props.alt ? styles.secondaryheader : styles.primaryheader}>
      <View style={styles.left}>
        <BackToButton to={props.to} />
      </View>
      <View style={styles.center}>
        <Text style={styles.title}>{props.title}</Text>
      </View>
      <View style={styles.right}>{props.right}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  primaryheader: {
    height: 56,
    top: 0,
    zIndex: 5,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
    backgroundColor: '#11a4ff',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  secondaryheader: {
    height: 56,
    top: 0,
    zIndex: 5,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
    backgroundColor: '#ffc630',
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  title: {
    fontFamily: 'Montserrat-SemiBold',
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: 4,
    fontSize: 17,
  },
  left: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  center: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  right: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default HeaderPadding;
