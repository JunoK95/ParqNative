import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

interface ListItemDuoProps {
  leftIcon?: string;
  leftIconColor?: string;
  leftPress?: () => void;
  title?: string;
  subtitle?: string;
  rightContent?: string;
  rightText?: string;
  rightIcon?: string | null;
  rightColor?: string;
  rightPress?: () => void;
  onPress?: () => void;
}

const ListItemDuo: React.FC<ListItemDuoProps> = ({
  leftIcon,
  leftIconColor,
  leftPress,
  title,
  subtitle,
  rightContent,
  rightText,
  rightIcon,
  rightColor,
  rightPress,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
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
          {subtitle && <Text style={styles.itemsubtext}>{subtitle}</Text>}
        </View>
        <View style={styles.itemright}>
          {rightText ? (
            <View style={styles.inforow}>
              <Text
                numberOfLines={1}
                style={{...styles.itemrighttext, color: rightColor}}>
                {' ' + rightText}
              </Text>
            </View>
          ) : (
            <FontAwesome5Icon
              style={styles.floatright}
              name={rightIcon}
              color={rightColor}
              size={24}
              onPress={rightPress}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ListItemDuo;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 20,
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
    fontSize: 16,
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
