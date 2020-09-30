import React from 'react';
import BackToButton from '../../navigation/BackToButton';
import {View, Text, StyleSheet} from 'react-native';

const HeaderPaddingIphoneX = props => {
  const {to, alt, title, right} = props;

  const HeaderStyle = StyleSheet.flatten([
    styles.primaryheader,
    {backgroundColor: alt ? '#ffc630' : '#11a4ff'},
  ]);

  return (
    <View style={HeaderStyle}>
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

export default HeaderPaddingIphoneX;

const styles = StyleSheet.create({
  primaryheader: {
    top: 0,
    zIndex: 5,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
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
    flex: 6,
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
