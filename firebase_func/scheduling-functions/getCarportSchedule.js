import firebase from '../../firebase';

const db = firebase.firestore();

export async function getCarportSchedule(port_id) {
  try {
    return await db
      .collection('carports')
      .doc(port_id)
      .get()
      .then(doc => {
        if (doc.exists) {
          console.log('DOC EXISTS', doc.data());
          return doc.data().schedule;
        } else {
          console.warn('CARPORT DOES NOT EXIST');
          return;
        }
      });
  } catch (error) {
    console.error('ERROR GETTING CARPORT SCHEDULE', error);
  }
}
