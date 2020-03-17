import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  TouchableNativeFeedback,
  Dimensions,
} from 'react-native';
import {Icon, Button} from 'react-native-elements';
import {AuthContext} from '../../context/AuthContext';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import {SocialIcon} from 'react-native-elements';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const LoginView = props => {
  const context = useContext(AuthContext);
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [error, seterror] = useState('');
  const [load, setload] = useState(false);

  const handleSignIn = async () => {
    if (email === '') {
      seterror('Email Address Missing');
    } else if (password === '') {
      seterror('Password Missing');
    } else {
      console.log('signing in');
      setload(true);
      await context.functions.signInUser(email, password).then(res => {
        if (res.error) {
          seterror(res.error.message);
        } else {
          setload(false);
          props.navigation.navigate('App');
        }
      });
    }
  };

  const handleFbSignIn = () => {
    console.log('fblogin');
  };

  const _signIn = async () => {
    try {
      setload(true);
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('USER INFO => ', userInfo);
      const loggedIn = await context.functions.googleSignIn(
        userInfo.idToken,
        userInfo.accessToken,
      );
      if (loggedIn) {
        setload(false);
        props.navigation.navigate('App');
      }
    } catch (err) {
      setload(false);
      console.log(err);
      if (err.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (err.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (err.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  return (
    <View style={styles.bg}>
      {error ? <Text>{error}</Text> : null}
      {load ? (
        <ActivityIndicator />
      ) : (
        <React.Fragment>
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
              value={password}
              onChangeText={text => setpassword(text)}
            />
          </View>
          {/* <View style={styles.buttonRowContainer}>
            <TouchableNativeFeedback onPress={handleSignIn}>
              <View style={styles.buttonContainer}>
                <View style={styles.buttonleft}>
                  <Icon
                    iconStyle={styles.icon2}
                    name={'assignment-ind'}
                    size={24}
                  />
                </View>
                <View style={styles.buttonright}>
                  <Text style={styles.buttonText}>Email Sign In</Text>
                </View>
              </View>
            </TouchableNativeFeedback>
          </View>
          <View style={styles.buttonRowContainer}>
            <GoogleSigninButton
              style={styles.googleButtonContainer}
              onPress={() => _signIn()}
            />
          </View> */}
          <View style={{marginHorizontal: 48, marginTop: 36,}}>
            <SocialIcon
              type={'envelope'}
              title={'Sign in with Parq'}
              button
              onPress={() => handleSignIn()}
            />
          </View>
          <View style={{marginHorizontal: 48}}>
            <SocialIcon
              type={'google'}
              title={'Sign in with Google'}
              button
              onPress={() => _signIn()}
            />
          </View>
        </React.Fragment>
      )}
    </View>
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
  icon2: {
    paddingVertical: 8,
    paddingRight: 12,
    color: '#fff',
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
  googleButtonContainer: {
    width: 192,
    height: 48,
  },
  buttonRowContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
  },
  buttonleft: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  buttonright: {
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonContainer: {
    width: 184,
    height: 40,
    marginTop: 36,
    marginVertical: 8,
    borderRadius: 4,
    backgroundColor: '#3e51b5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
  },
});

export default LoginView;
