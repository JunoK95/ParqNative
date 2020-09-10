import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import {Icon} from 'react-native-elements';
import OrbLoading from '../../components/loading/OrbLoading';
import {sendPWResetEmail} from '../../firebase_func/userFunctions';

const PWResetView = props => {
  const [email, setemail] = useState('');
  const [error, seterror] = useState('');
  const [success, setsuccess] = useState(false);
  const [load, setload] = useState(false);

  const handleSubmit = async () => {
    setload(true);
    try {
      await sendPWResetEmail(email);
      setload(false);
      setsuccess(true);
    } catch (err) {
      console.error(err);
      setload(false);
      seterror('Unable to send password reset email');
    }
  };

  if (success) {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.bg}>
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoText}>
              You will be sent an email to reset your password shortly! {'\n'}
              {'\n'}
              Thank you for using Parq!
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('Login');
            }}>
            <View style={styles.backContainer}>
              <Text style={styles.backText}>Go Back</Text>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.bg}>
        {error ? (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}
        {load ? (
          <OrbLoading />
        ) : (
          <React.Fragment>
            {process.env.NODE_ENV === 'development' && <Text>DEV MODE</Text>}
            <View style={styles.formContainer}>
              <View style={styles.textFieldContainer}>
                <Icon iconStyle={styles.icon} name={'email'} size={30} />
                <TextInput
                  style={styles.textField}
                  name={'email'}
                  placeholder={'email'}
                  textContentType={'emailAddress'}
                  value={email}
                  onChangeText={text => setemail(text)}
                />
              </View>
            </View>
            <TouchableOpacity onPress={handleSubmit}>
              <View style={styles.backContainer}>
                <Text style={styles.backText}>Submit</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Login');
              }}>
              <View style={styles.backContainer}>
                <Text style={styles.backText}>Go Back</Text>
              </View>
            </TouchableOpacity>
          </React.Fragment>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: '#11a4ff',
    alignContent: 'center',
    justifyContent: 'center',
  },
  icon: {
    paddingVertical: 8,
    paddingRight: 12,
    color: '#ffc630',
  },
  formContainer: {
    marginVertical: 36,
  },
  textFieldContainer: {
    margin: 12,
    marginHorizontal: 64,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
  },
  textField: {
    height: 48,
    width: '100%',
    paddingHorizontal: 24,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  errorBox: {
    backgroundColor: '#f44336',
    paddingHorizontal: 64,
    marginHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 24,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
  },
  backContainer: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  backText: {
    fontSize: 16,
    color: 'blue',
    fontFamily: 'Montserrat',
    textAlign: 'center',
  },
  infoTextContainer: {
    paddingHorizontal: 32,
  },
  infoText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
  },
});

export default PWResetView;
