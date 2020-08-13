import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from 'react-native';

const ReferralView = () => {
  const [value, setvalue] = useState('');
  const [error, seterror] = useState(null);

  const handleTextChange = text => {
    setvalue(text);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.bg}>
        <View style={styles.contentcontainer}>
          <Text style={styles.titletext}>
            {error
              ? error.message
              : 'If you have been referred by someone, please enter their referral code below'}
          </Text>
        </View>
        <TextInput
          style={styles.inputcontainer}
          value={value}
          onChangeText={text => handleTextChange(text)}
          placeholder={'code'}
          label={'Referral Code'}
          keyboardType={'default'}
        />
        <TouchableOpacity onPress={() => {}}>
          <View style={styles.row}>
            <Text style={styles.skiptext}>Skip</Text>
          </View>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ReferralView;

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: '#11a4ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputcontainer: {
    color: '#fff',
    fontSize: 32,
    paddingVertical: 24,
    backgroundColor: 'rgba(0,0,0,0)',
    textAlign: 'center',
  },
  titletext: {
    textAlign: 'center',
    fontSize: 20,
    color: '#fff',
    paddingHorizontal: 32,
    fontFamily: 'Montserrat-Bold',
  },
  skiptext: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 20,
    color: '#ffc630',
    paddingHorizontal: 4,
    fontFamily: 'Montserrat-Bold',
  },
  row: {
    flexDirection: 'row',
  },
});
