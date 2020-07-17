import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import LottieView from 'lottie-react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {twilioCheckCodeVerification} from '../../api/twilio_index';
import {AuthContext} from '../../context/AuthContext';
import {withNavigation} from 'react-navigation';
import OrbLoading from '../loading/OrbLoading';

const PhoneCodeForm = ({service_sid, phone, navigation}) => {
  const context = useContext(AuthContext);
  const [code, setcode] = useState('');
  const [error, seterror] = useState(null);
  const [loading, setloading] = useState(false);

  const handleSubmit = async () => {
    seterror(null);
    setloading(true);
    try {
      const status = await twilioCheckCodeVerification(
        service_sid,
        phone,
        code,
      );
      console.log('PHONE VERIFICATION STATUS => ', status.data);
      if (status.data === 'approved') {
        context.functions.addContextPhone(phone);
        setloading(false);
        navigation.navigate('Home');
        return;
      } else {
        setloading(false);
        seterror({
          message:
            'Phone could not verified. Please make sure you have entered the code correctly.',
        });
      }
    } catch (err) {
      setloading(false);
      console.error(err);
    }
  };

  if (loading) {
    return <OrbLoading />;
  }

  return (
    <React.Fragment>
      <View style={styles.contentcontainer}>
        <LottieView
          style={styles.lottieContainer}
          source={require('../../resources/animations/LockSMS.json')}
          autoPlay
          loop={true}
        />
      </View>
      <View style={styles.contentcontainer}>
        <Text style={styles.titletext}>
          {error ? error.message : 'Please Enter the 4-digit Verification Code'}
        </Text>
      </View>
      <TextInput
        style={styles.inputcontainer}
        value={code}
        onChangeText={text => setcode(text)}
        placeholder={'xxxx'}
        label={'code'}
        maxLength={4}
        keyboardType={'phone-pad'}
        textContentType={'oneTimeCode'}
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

export default withNavigation(PhoneCodeForm);

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
    width: '60%',
  },
});
