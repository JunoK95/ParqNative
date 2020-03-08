import React, {useContext} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Axios from 'axios';
import {AuthContext} from '../../context/AuthContext';

const StripeActivate0 = () => {
  const context = useContext(AuthContext);
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

  const getAccountInfo = () => {
    let account_id;
    try {
      account_id = context.user_data.stripe_account_id;
    } catch {
      console.log('Could not retrieve stripe_account_id');
    }

    if (account_id) {
      console.log(account_id);
      Axios({
        method: 'POST',
        url: 'https://us-central1-parq-dev.cloudfunctions.net/stripeGetAccount',
        data: {
          account_id: account_id,
        },
      }).then(res => {
        console.log(res.data);
      });
    } else {
      context.functions.assignStripeAccount();
    }
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
      <TouchableOpacity onPress={() => getAccountInfo()}>
        <Text>Get Account Info</Text>
      </TouchableOpacity>
    </View>
  );
};

export default StripeActivate0;

const styles = StyleSheet.create({});
