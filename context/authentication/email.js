import firebase from '../../firebase';

const auth = firebase.auth();

export const registerUserEmail = async (email, pw, display_name) => {
  try {
    await auth.createUserWithEmailAndPassword(email, pw);
  } catch (error) {
    console.error('ERROR CREATING ACCOUNT => ', error);
  }
};
