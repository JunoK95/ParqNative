import React from 'react';
import BackToButton from '../navigation/BackToButton';
import {View, Text, StyleSheet} from 'react-native';

const HeaderPaddingiOS = props => {
  const {to, alt, title, right} = props;

  return (
    <View style={alt ? styles.secondaryheader : styles.primaryheader}>
      <View style={styles.left}>
        <BackToButton to={to} />
      </View>
      <View style={styles.center}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
      </View>
      <View style={styles.right}>{right}</View>
    </View>
  );
};

export default HeaderPaddingiOS;

const styles = StyleSheet.create({
  primaryheader: {
    top: 0,
    zIndex: 5,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
    backgroundColor: '#11a4ff',
    paddingHorizontal: 24,
    paddingVertical: 12,
    paddingTop: 42,
  },
  secondaryheader: {
    top: 0,
    zIndex: 5,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
    backgroundColor: '#ffc630',
    paddingHorizontal: 24,
    paddingVertical: 12,
    paddingTop: 42,
  },
  title: {
    fontFamily: 'Montserrat-SemiBold',
    textAlign: 'center',
    textAlignVertical: 'center',
    marginTop: 4,
    fontSize: 16,
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
