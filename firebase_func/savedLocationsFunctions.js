import firebase from '../firebase';
import moment from 'moment';

const db = firebase.firestore();

export async function addSavedLocation(
  user_id,
  title,
  formatted_address,
  place_id,
  lat,
  lng,
) {
  const newLocationData = {
    user_id,
    title,
    formatted_address,
    place_id,
    lat,
    lng,
    date_created: moment().unix(),
  };

  var userDoc = db
    .collection('users')
    .doc(user_id)
    .collection('saved_locations')
    .doc();

  var returnValue = false;

  returnValue = await userDoc
    .set(newLocationData)
    .then(res => {
      console.log(res);
      return true;
    })
    .catch(err => console.error(err));

  if (returnValue) {
    return {id: userDoc.id, data: newLocationData};
  } else {
    return false;
  }
}

export async function getSavedLocations(user_id) {
  var docRef = await db
    .collection('users')
    .doc(user_id)
    .collection('saved_locations')
    .where('user_id', '==', user_id)
    .limit(10)
    .get()
    .then(snapshot => {
      let newSnap = [];
      snapshot.forEach(doc => {
        newSnap.push({id: doc.id, data: doc.data()});
      });
      return newSnap;
    })
    .catch(err => console.error(err));

  return docRef;
}

export async function deleteSavedLocation(user_id, doc_id) {
  var docRef = db
    .collection('users')
    .doc(user_id)
    .collection('saved_locations')
    .doc(doc_id);

  docRef.delete();
}
