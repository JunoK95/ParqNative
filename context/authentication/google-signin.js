import firebase from '../../firebase';

export const googleFirebaseSignin = async (id_token, access_token) => {
  const credential = firebase.auth.GoogleAuthProvider.credential(
    id_token,
    access_token,
  );

  let firebase_credential;
  try {
    firebase_credential = await firebase
      .auth()
      .signInWithCredential(credential);
  } catch (error) {
    console.error(error);
    firebase_credential = {error};
  }

  return firebase_credential;
};
