import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {PhoneCodeForm, PhoneEntryForm} from '../components/phone-verification';

const GetPhoneView = () => {
  const [ssid, setssid] = useState(null);
  const onPhoneEntry = service_sid => {
    console.log(service_sid);
    setssid(service_sid);
  };

  return (
    <View style={styles.bg}>
      {!ssid ? <PhoneCodeForm /> : <PhoneEntryForm onSubmit={onPhoneEntry} />}
    </View>
  );
};

export default GetPhoneView;

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: '#11a4ff',
    alignContent: 'center',
    justifyContent: 'center',
  },
});
