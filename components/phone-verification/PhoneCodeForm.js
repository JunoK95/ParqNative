import React, {useState} from 'react';
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

const PhoneCodeForm = () => {
  const [code, setcode] = useState('');

  const handleSubmit = () => {
    console.log('submit');
  };

  return (
    <React.Fragment>
      <View style={styles.contentcontainer}>
        <LottieView
          style={styles.lottieContainer}
          source={require('../../resources/animations/LockSMS.json')}
          autoPlay
          loop={false}
        />
      </View>
      <View style={styles.contentcontainer}>
        <Text style={styles.titletext}>
          {'We need your phone number to get started'}
        </Text>
      </View>
      <TextInput
        style={styles.inputcontainer}
        value={code}
        onChangeText={text => setcode(text)}
        placeholder={'xxxx'}
        label={'code'}
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

export default PhoneCodeForm;

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
