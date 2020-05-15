import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {AuthContext} from '../context/AuthContext';

const GetPhoneView = () => {
  const [phone, setphone] = useState('');
  const context = useContext(AuthContext);

  const normalizeInput = (value, previousValue) => {
    if (!value) {
      return value;
    }
    const currentValue = value.replace(/[^\d]/g, '');
    const cvLength = currentValue.length;

    if (!previousValue || value.length > previousValue.length) {
      if (cvLength < 4) {
        return currentValue;
      }
      if (cvLength < 7) {
        return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`;
      }
      // eslint-disable-next-line prettier/prettier
      return (`(${currentValue.slice(0, 3)}) ${currentValue.slice(3, 6)}-${currentValue.slice(6, 10)}`);
    }
  };

  const handlePhoneChange = number => {
    setphone(normalizeInput(number));
  };

  const handleSubmit = () => {
    if (phone.length === 14) {
      context.functions.addContextPhone(phone);
    }
  };

  return (
    <View style={styles.bg}>
      <View style={styles.contentcontainer}>
        <FontAwesome5Icon name={'phone'} size={36} color={'white'} />
      </View>
      <View style={styles.contentcontainer}>
        <Text style={styles.titletext}>
          {'We need your phone number to get started'}
        </Text>
      </View>
      <TextInput
        style={styles.inputcontainer}
        value={phone}
        onChangeText={text => handlePhoneChange(text)}
        placeholder={'(xxx) xxx-xxxx'}
        label={'Phone Number'}
        keyboardType={'phone-pad'}
        textContentType={'telephoneNumber'}
      />
      <TouchableOpacity onPress={handleSubmit}>
        <View style={styles.contentcontainer}>
          <FontAwesome5Icon
            name={'arrow-circle-right'}
            size={36}
            color={'#ffc630'}
          />
        </View>
      </TouchableOpacity>
      {/* <Input
        containerStyle={styles.inputcontainer}
        value={phone}
        onChangeText={text => handlePhoneChange(text)}
        placeholder={'(xxx) xxx-xxxx'}
        label={'Phone Number'}
        keyboardType={'phone-pad'}
        textContentType={'telephoneNumber'}
      /> */}
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
  container: {
    width: Dimensions.get('window').width - 32,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    marginVertical: 12,
    shadowColor: '#000',
    shadowOffset: {width: 4, height: 4},
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
    padding: 32,
    alignSelf: 'center',
  },
  contentcontainer: {
    alignItems: 'center',
    flexDirection: 'column',
    padding: 16,
  },
  titletext: {
    textAlign: 'center',
    fontSize: 24,
    color: '#fff',
    paddingHorizontal: 32,
    fontFamily: 'Montserrat-Bold',
  },
  contenttext: {
    textAlign: 'center',
    fontSize: 17,
    color: '#555',
    fontFamily: 'Montserrat-Medium',
  },
  inputcontainer: {
    color: '#fff',
    fontSize: 32,
    backgroundColor: 'rgba(0,0,0,0)',
    textAlign: 'center',
  },
});
