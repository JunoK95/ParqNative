import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {AuthContext} from '../../context/AuthContext';
import OrbLoading from '../../components/loading/OrbLoading';
import {
  EmailSignInButton,
  GoogleSignInButton,
  AppleSignInButton,
} from '../../components/login';

const LoginView = props => {
  const context = useContext(AuthContext);
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [error, seterror] = useState('');
  const [load, setload] = useState(false);

  const handleSignIn = async () => {
    if (email === '') {
      seterror('Email Address Missing');
      setload(false);
      return;
    } else if (password === '') {
      seterror('Password Missing');
      setload(false);
      return;
    } else {
      console.log('signing in');
      setload(true);
      await context.functions.signInUser(email, password).then(res => {
        if (res.error) {
          seterror(res.error.message);
          setload(false);
        } else {
          setload(false);
          props.navigation.navigate('App');
        }
      });
    }
  };

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
              <View style={styles.textFieldContainer}>
                <Icon iconStyle={styles.icon} name={'lock'} size={30} />
                <TextInput
                  style={styles.textField}
                  name={'password'}
                  placeholder={'password'}
                  textContentType={'password'}
                  secureTextEntry
                  autoCorrect={false}
                  value={password}
                  onChangeText={text => setpassword(text)}
                />
              </View>
            </View>
            <EmailSignInButton handlePress={handleSignIn} />
            <GoogleSignInButton seterror={seterror} setload={setload} />
            {Platform.OS === 'ios' ? (
              <AppleSignInButton seterror={seterror} setload={setload} />
            ) : null}
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('PWReset');
              }}>
              <View style={styles.backContainer}>
                <Text style={styles.backText}>Forgot Your Password?</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Landing');
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
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default LoginView;
