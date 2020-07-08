import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const CustomButton = ({handlePress, title, reverse}) => {
  if (reverse) {
    return (
      <TouchableOpacity onPress={handlePress}>
        <View style={styles.buttonContainer2}>
          <Text style={styles.text2}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.buttonContainer}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  buttonContainer: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    backgroundColor: '#11a4ff',
    height: 44,
  },
  text: {
    textAlignVertical: 'center',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    textAlign: 'center',
    color: '#FFF',
  },
  buttonContainer2: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0)',
    height: 44,
  },
  text2: {
    textAlignVertical: 'center',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    textAlign: 'center',
    color: '#11a4ff',
  },
});
