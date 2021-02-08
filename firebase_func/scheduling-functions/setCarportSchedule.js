import moment from 'moment';
import firebase from '../../firebase';

const db = firebase.firestore();

export async function setCarportSchedule(port_id, owner_id, schedule) {
  try {
    await db
      .collection('carport_schedules')
      .doc(port_id)
      .set(
        {
          date_updated: moment().unix(),
          owner_id,
          ...schedule,
        },
        {merge: true},
      );
  } catch (error) {
    console.error('ERROR SETTING SCHEDULE', error);
  }
  try {
    await db
      .collection('carports')
      .doc(port_id)
      .update({
        schedule: {
          date_updated: moment().unix(),
          ...schedule,
        },
      });
  } catch (error) {
    console.error('ERROR SETTING SCHEDULE 2', error);
  }
}
