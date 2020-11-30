import React from 'react';
import {
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';

const TouchableNativeReplacement = ({color, onPress, children}) => {
  let underlayColor = color;
  switch (color) {
    case 'primary':
      underlayColor = '#c2e8ff';
      break;
    case 'secondary':
      underlayColor = '#ffecb9';
      break;
    default:
      underlayColor = color;
      break;
  }

  return Platform.OS === 'android' ? (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple(underlayColor)}
      onPress={onPress}>
      {children}
    </TouchableNativeFeedback>
  ) : (
    <TouchableOpacity onPress={onPress}>{children}</TouchableOpacity>
  );
};

export default TouchableNativeReplacement;
