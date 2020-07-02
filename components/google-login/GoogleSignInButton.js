import {GoogleSignin} from '@react-native-community/google-signin';
import React from 'react';
import {Button} from 'react-native';
import firebase from '../../firebase';

const auth = firebase.auth();

GoogleSignin.configure({
  webClientId:
    '480005596961-gbloqo7semp724i2h8et0c21orb5sdra.apps.googleusercontent.com',
});

function GoogleSignInButton() {
  const onGoogleButtonPress = async () => {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    console.log('GOOGLE CREDENTIAL => ', googleCredential);
    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  };

  return (
    <Button
      title="Google Sign-In"
      onPress={() =>
        onGoogleButtonPress()
          .then(() => console.log('Signed in with Google!'))
          .catch(error => console.error('GOOGLE SIGN IN ERROR => ', error))
      }
    />
  );
}

export default GoogleSignInButton;
