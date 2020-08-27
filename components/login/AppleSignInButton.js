import appleAuth, {
  AppleAuthRequestScope,
  AppleAuthRequestOperation,
} from '@invertase/react-native-apple-authentication';
import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {AuthContext} from '../../context/AuthContext';
import {withNavigation} from 'react-navigation';
import {SocialIcon} from 'react-native-elements';

function AppleSignInButton({seterror, setload, navigation}) {
  const context = useContext(AuthContext);
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
      seterror('Apple Sign-In Failed');
      throw 'Apple Sign-In failed - no identify token returned';
    }

    // Create a Firebase credential from the response
    const {identityToken, nonce} = appleAuthRequestResponse;

    const loggedIn = await context.functions.appleSignIn(identityToken, nonce);
    console.log('APPLE LOGGED IN =>', loggedIn);
    if (loggedIn) {
      setload(false);
      navigation.navigate('App');
    }

    return;
  }

  return (
    <View style={styles.buttonContainer}>
      <SocialIcon
        type={'apple'}
        title={'Sign in with Apple'}
        light
        button
        onPress={() => onAppleButtonPress()}
      />
    </View>
    // <AppleButton
    //   buttonStyle={AppleButton.Style.WHITE}
    //   buttonType={AppleButton.Type.SIGN_IN}
    //   style={styles.appleButtonDimensions}
    //   onPress={() =>
    //     onAppleButtonPress().then(() => console.log('Apple sign-in complete!'))
    //   }
    // />
  );
}

export default withNavigation(AppleSignInButton);

const styles = StyleSheet.create({
  buttonContainer: {
    marginHorizontal: 48,
  },
});
