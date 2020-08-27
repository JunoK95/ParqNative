import firebase from '../../firebase';
import appleAuth, {
  AppleAuthRequestScope,
  AppleAuthRequestOperation,
} from '@invertase/react-native-apple-authentication';

export const appleFirebaseSignIn = async (identityToken, nonce) => {
  const appleCredential = firebase.auth.AppleAuthProvider.credential(
    identityToken,
    nonce,
  );

  const userCredential = await firebase
    .auth()
    .signInWithCredential(appleCredential);

  return userCredential;
};
