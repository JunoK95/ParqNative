import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

const StripeActivate0 = () => {
  const pickImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
    });
  };

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
    });
  };

  return (
    <View>
      <Text>TOS</Text>
      <TouchableOpacity onPress={() => pickImage()}>
        <Text>OPEN IMAGE PICKER</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => openCamera()}>
        <Text>OPEN CAMERA</Text>
      </TouchableOpacity>
    </View>
  );
};

export default StripeActivate0;

const styles = StyleSheet.create({});
