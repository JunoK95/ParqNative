import firebase from '../../firebase';
import {
  initializeDefaultUser,
  getSavedLocations,
  getSavedVehicles,
  getUserData,
} from '../../firebase_func/firestoreFunctions';

const auth = firebase.auth();

export const getUserStateInfo = async (email, display_name) => {
  let userData = await getUserData(auth.currentUser.uid);
  if (userData.error) {
    userData = await initializeDefaultUser(
      auth.currentUser.uid,
      email,
      display_name,
    );
  }
  const savedLocations = await getSavedLocations(auth.currentUser.uid);
  const savedVehicles = await getSavedVehicles(auth.currentUser.uid);

  return {
    userData,
    savedLocations,
    savedVehicles,
  };
};
