import firebase from '../../firebase';

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
