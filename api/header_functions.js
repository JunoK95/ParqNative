import firebase from '../firebase';

const getCurrentUserIdToken = async () => {
  const IdToken = await firebase.auth().currentUser.getIdToken();
  return IdToken;
};

export const createFirebaseAuthHeader = async () => {
  const IdToken = await getCurrentUserIdToken();
  const header = {
    Authorization: `Bearer ${IdToken}`,
  };
  console.log(header);
  return header;
};
