import React from 'react';
import {
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';

const TouchableNativeReplacement = props => {
  const {color} = props;

  let underlayColor = color;
  switch (color) {
    case 'primary':
      underlayColor = '#c2e8ff';
      break;
    case 'secondary':
      underlayColor = '#ffecb9';
      break;
    default:
      break;
  }

  return Platform.OS === 'android' ? (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple(underlayColor)}
      onPress={props.onPress}>
      {props.children}
    </TouchableNativeFeedback>
  ) : (
    <TouchableOpacity onPress={props.onPress}>
      {props.children}
    </TouchableOpacity>
  );
};

export default TouchableNativeReplacement;
