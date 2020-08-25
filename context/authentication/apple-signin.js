import firebase from '../../firebase';
import appleAuth, {
  AppleAuthRequestScope,
  AppleAuthRequestOperation,
} from '@invertase/react-native-apple-authentication';

export const appleFirebaseSignIn = async (id_token, access_token) => {
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
  const appleCredential = firebase.auth.AppleAuthProvider.credential(
    identityToken,
    nonce,
  );

  const userCredential = await firebase
    .auth()
    .signInWithCredential(appleCredential);

  return userCredential;
};
