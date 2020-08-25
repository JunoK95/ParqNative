import firebase from '../../firebase';
import appleAuth, {
  AppleAuthRequestScope,
  AppleAuthRequestOperation,
} from '@invertase/react-native-apple-authentication';
import React from 'react';
import {StyleSheet} from 'react-native';
import {AppleButton} from '@invertase/react-native-apple-authentication';

function AppleSignIn() {
  async function onAppleButtonPress() {
    // Start the sign-in request
    console.log('START APPLE SIGN IN');
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: AppleAuthRequestOperation.LOGIN,
      requestedScopes: [
        AppleAuthRequestScope.EMAIL,
        AppleAuthRequestScope.FULL_NAME,
      ],
    });

    // Ensure Apple returned a user identityToken
    if (!appleAuthRequestResponse.identityToken) {
      throw 'Apple Sign-In failed - no identify token returned';
    }

    // Create a Firebase credential from the response
    const {identityToken, nonce} = appleAuthRequestResponse;
    console.log(
      'APPLE AUTH REQUEST RESPONSE =>',
      identityToken,
      'nonce',
      nonce,
    );
    const appleCredential = firebase.auth.AppleAuthProvider.credential(
      identityToken,
      nonce,
    );

    console.log('APPLE CREDENTIAL =>', appleCredential);

    // Sign the user in with the credential
    return firebase.auth().signInWithCredential(appleCredential);
  }
  return (
    <AppleButton
      buttonStyle={AppleButton.Style.WHITE}
      buttonType={AppleButton.Type.SIGN_IN}
      style={styles.appleButtonDimensions}
      onPress={() =>
        onAppleButtonPress().then(() => console.log('Apple sign-in complete!'))
      }
    />
  );
}

export default AppleSignIn;

const styles = StyleSheet.create({
  appleButtonDimensions: {
    width: 160,
    height: 45,
  },
});
