import React, {useState} from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import {Platform} from 'react-native';
import {Switch} from 'react-native';
import {StyleSheet, Text, View} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const CustomListItemSwitch = ({
  title,
  subtitle,
  backgroundColor,
  opacity,
  leftIcon,
  leftIconColor,
  leftPress,
  handlePress,
  handleSwitch,
  active,
}) => {
  return (
    <TouchableWithoutFeedback disabled={false} onPress={handlePress}>
      <View style={{...styles.item, backgroundColor}}>
        <View style={styles.itemleft}>
          <FontAwesome5Icon
            name={leftIcon}
            color={leftIconColor}
            size={24}
            onPress={leftPress}
          />
        </View>
        <View style={{...styles.itemcenter, opacity: active ? 1 : 0.4}}>
          <Text style={styles.itemtext}>{title}</Text>
          <Text style={styles.itemsubtext}>{subtitle}</Text>
        </View>
        <View style={styles.itemright}>
          <Switch
            trackColor={{
              true: '#11A4FF',
              false: Platform.OS === 'android' ? '#d3d3d3' : '#fbfbfb',
            }}
            ios_backgroundColor="#fbfbfb"
            style={{transform: [{scaleX: 0.7}, {scaleY: 0.7}]}}
            value={active}
            onValueChange={handleSwitch}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CustomListItemSwitch;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    paddingVertical: 16,
  },
  itemleft: {
    flex: 1,
    justifyContent: 'center',
  },
  itemcenter: {
    flex: 8,
    justifyContent: 'center',
  },
  itemright: {
    flex: 2,
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
