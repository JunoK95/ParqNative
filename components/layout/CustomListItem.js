import React from 'react';
import {StyleSheet, Text, View, TouchableNativeFeedback} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const CustomListItem = props => {
  const {title, subtitle, icon, iconColor, handlePress, rippleColor} = props;

  return (
    <TouchableNativeFeedback
      onPress={handlePress}
      background={TouchableNativeFeedback.Ripple(rippleColor)}>
      <View style={styles.item}>
        <View style={styles.itemleft}>
          <FontAwesome5Icon
            name={icon}
            size={24}
            color={iconColor}
            style={iconColor === 'white' && styles.textshadow}
          />
        </View>
        <View style={styles.itemright}>
          <Text style={styles.itemtext}>{title}</Text>
          {subtitle && <Text style={styles.itemsubtext}>{subtitle}</Text>}
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    paddingVertical: 16,
  },
  itemleft: {
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  itemright: {
    justifyContent: 'center',
  },
  itemtext: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 15,
    paddingRight: 72,
  },
  itemsubtext: {
    fontFamily: 'Montserrat-Medium',
    color: '#555',
    fontSize: 13,
    paddingRight: 72,
  },
  textshadow: {
    textShadowRadius: 8,
  },
});
