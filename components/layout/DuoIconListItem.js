import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const DuoIconListItem = props => {
  const {
    title,
    subtitle,
    leftIcon,
    leftIconColor,
    leftPress,
    rightIcon,
    rightIconColor,
    rightPress,
    rightText,
    rightContent,
    handlePress,
  } = props;

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.item}>
        <View style={styles.itemleft}>
          <FontAwesome5Icon
            name={leftIcon}
            color={leftIconColor}
            size={24}
            onPress={leftPress}
          />
        </View>
        <View style={styles.itemcenter}>
          <Text style={styles.itemtext}>{title}</Text>
          <Text style={styles.itemsubtext}>{subtitle}</Text>
        </View>
        <View style={styles.itemright}>
          {rightText ? (
            <View style={styles.inforow}>
              <FontAwesome5Icon
                name={'clock'}
                style={styles.clockicon}
                color={'#888'}
              />
              <Text numberOfLines={1} style={styles.itemrighttext}>
                {' ' + rightText}
              </Text>
            </View>
          ) : (
            <FontAwesome5Icon
              style={styles.floatright}
              name={rightIcon}
              color={rightIconColor}
              size={24}
              onPress={rightPress}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DuoIconListItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    paddingVertical: 16,
  },
  itemleft: {
    flex: 1,
    paddingRight: 20,
    justifyContent: 'center',
  },
  itemcenter: {
    flex: 8,
    justifyContent: 'center',
  },
  itemright: {
    flex: 3,
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
  itemrighttext: {
    fontFamily: 'Montserrat-Medium',
    color: '#555',
    fontSize: 13,
  },
  floatright: {
    justifyContent: 'flex-end',
    textAlign: 'right',
  },
  inforow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  clockicon: {
    fontSize: 16,
    textAlign: 'right',
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
    textAlignVertical: 'center',
  },
});
