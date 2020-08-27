import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {SocialIcon} from 'react-native-elements';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import {AuthContext} from '../../context/AuthContext';
import {withNavigation} from 'react-navigation';

function GoogleSignInButton({seterror, setload, navigation}) {
  const context = useContext(AuthContext);

  const _signIn = async () => {
    try {
      setload(true);
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('USER INFO => ', userInfo);
      const {idToken, accessToken} = userInfo;
      const loggedIn = await context.functions.googleSignIn(
        idToken,
        accessToken,
      );
      if (loggedIn) {
        setload(false);
        navigation.navigate('App');
      }
    } catch (err) {
      setload(false);
      console.log('ERROR SIGNING IN => ', err);
      if (err.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        seterror('Sign In Cancelled');
      } else if (err.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (err.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        seterror('Play Services Not Available');
      } else {
        // some other error happened
        seterror('Error Logging In');
      }
    }
  };

  return (
    <View style={styles.buttonContainer}>
      <SocialIcon
        type={'google'}
        title={'Sign in with Google'}
        button
        onPress={_signIn}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginHorizontal: 48,
  },
});

export default withNavigation(GoogleSignInButton);
