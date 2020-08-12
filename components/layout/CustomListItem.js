import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import TouchableNativeReplacement from './TouchableNativeReplacement';

const CustomListItem = ({
  title,
  subtitle,
  icon,
  iconColor,
  iconSize,
  handlePress,
  rippleColor,
}) => {
  return (
    <TouchableNativeReplacement onPress={handlePress} color={rippleColor}>
      <View style={styles.item}>
        <View style={styles.itemleft}>
          <FontAwesome5Icon
            name={icon}
            size={iconSize ? iconSize : 24}
            color={iconColor}
            style={iconColor === 'white' && styles.textshadow}
          />
        </View>
        <View style={styles.itemright}>
          <Text style={styles.itemtext}>{title}</Text>
          {subtitle && <Text style={styles.itemsubtext}>{subtitle}</Text>}
        </View>
      </View>
    </TouchableNativeReplacement>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    paddingVertical: 16,
    backgroundColor: 'white',
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
