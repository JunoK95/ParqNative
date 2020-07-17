import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {PhoneCodeForm, PhoneEntryForm} from '../components/phone-verification';

const GetPhoneView = () => {
  const [ssid, setssid] = useState(null);
  const [phone, setphone] = useState(null);

  const onPhoneEntry = (service_sid, phone_no) => {
    console.log(service_sid);
    setssid(service_sid);
    setphone(phone_no);
  };

  return (
    <View style={styles.bg}>
      {ssid && phone ? (
        <PhoneCodeForm service_sid={ssid} phone={phone} />
      ) : (
        <PhoneEntryForm onSubmit={onPhoneEntry} />
      )}
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
