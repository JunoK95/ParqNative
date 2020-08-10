import firebase from '../../firebase';

const auth = firebase.auth();

export const registerUserEmail = async (email, pw) => {
  console.log('CREATING ACCOUNT FOR => ', email);
  try {
    await auth.createUserWithEmailAndPassword(email, pw);
    return true;
  } catch (error) {
    console.error('ERROR CREATING ACCOUNT => ', error);
    return false;
  }
};

export const signInUserEmail = async (email, pw) => {
  try {
    return await auth.signInWithEmailAndPassword(email, pw);
  } catch (error) {
    console.error('ERROR SIGNING IN =>', error);
    return {error};
  }
};
