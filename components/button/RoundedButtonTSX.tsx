
import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

interface RoundedButtonProps {
  title: string,
  fontSize?: number,
  width?: number,
  textColor?: string,
  backgroundColor?: string,
  disabled?: boolean,
  onPress?: (param?: any) => void,
}

const RoundedButtonTSX: React.FC<RoundedButtonProps> = ({title, fontSize, width, textColor, backgroundColor, disabled, onPress}) => {
  let containerStyle:any = StyleSheet.flatten([
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

export default RoundedButtonTSX;

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

