import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const RoundedButton = ({
  onPress,
  title,
  backgroundColor,
  width,
  fontSize,
  textColor,
  disabled,
}) => {
  let containerStyle = StyleSheet.flatten([
    styles.container,
    {backgroundColor, width},
  ]);

  const textStyle = StyleSheet.flatten([
    styles.text,
    {color: textColor, fontSize},
  ]);

  if (disabled) {
    containerStyle = StyleSheet.flatten([containerStyle, {opacity: 0.4}]);
  }

  return (
    <TouchableOpacity disabled={disabled} onPress={onPress}>
      <View style={containerStyle}>
        <Text style={textStyle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default RoundedButton;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 30,
    alignItems: 'center',
    paddingVertical: 16,
    marginHorizontal: 12,
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: 'bold',
  },
});
