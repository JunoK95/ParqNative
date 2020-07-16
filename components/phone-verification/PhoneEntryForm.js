import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import {AuthContext} from '../../context/AuthContext';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import LottieView from 'lottie-react-native';
import {twilioCreateVerificationService} from '../../api/twilio_index';

const PhoneEntryForm = ({onSubmit}) => {
  const [phone, setphone] = useState('');
  const [error, seterror] = useState(null);
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

  const handleSubmit = async () => {
    seterror(null);
    if (phone.length === 14) {
      const formattedPhone =
        '+1' + phone.slice(1, 4) + phone.slice(6, 9) + phone.slice(10, 14);
      try {
        const service_sid = await twilioCreateVerificationService(
          formattedPhone,
          context.user_id,
        );
        onSubmit(service_sid);
        return;
      } catch (err) {
        seterror({error: err, message: 'Error Sending Verification Code'});
      }
      // context.functions.addContextPhone(phone);
    }
  };

  return (
    <React.Fragment>
      <View style={styles.contentcontainer}>
        <LottieView
          style={styles.lottieContainer}
          source={require('../../resources/animations/phone.json')}
          autoPlay
          loop
        />
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
    </React.Fragment>
  );
};

export default PhoneEntryForm;

const styles = StyleSheet.create({
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
  lottieContainer: {
    width: '20%',
  },
});
