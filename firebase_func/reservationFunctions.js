import firebase from '../firebase';
import moment from 'moment';

const db = firebase.firestore();

export async function getCurrentReservations(carport_id) {
  const query = db
    .collection('carports')
    .doc(carport_id)
    .collection('reservations')
    .where('end', '>', moment().unix());

  let reservations = await query.get().then(querySnapshot => {
    var resList = [];
    querySnapshot.forEach(doc => {
      resList.push(doc.data());
    });
    return resList;
  });

  return reservations;
}

export async function checkCarportAvailablity(carport, carport_id) {
  const query = db
    .collection('carports')
    .doc(carport_id)
    .collection('reservations')
    .where('end', '>', moment().unix());

  let reservations = await query.get().then(querySnapshot => {
    var resList = {};
    querySnapshot.forEach(doc => {
      resList[doc.id] = doc.data();
    });
    return resList;
  });

  const reskeys = Object.keys(reservations);
  console.log(reservations, reskeys.length, carport.available_spaces);

  //Checks number of current reservations
  if (reskeys.length === parseInt(carport.available_spaces, 10)) {
    console.log('Reservation Full');
    return false;
  }

  if (reskeys.length > parseInt(carport.available_spaces, 10)) {
    console.error('Carport Overbooked!');
    return false;
  }

  //Checks if current time is between start and end time
  if (!carport.allday) {
    if (
      moment().isBetween(
        moment(carport.start, 'HH:mm'),
        moment(carport.end, 'HH:mm'),
      )
    ) {
      console.log('Time Not In Between Parking Spot Schedule');
      return false;
    }
  }

  if (carport.timer_end) {
    if (moment().unix() >= carport.timer_end) {
      console.log('Timer Ended');
      return false;
    }
  }

  if (carport.schedule) {
    if (carport.schedule.enabled) {
      console.log('Checking Schedule');
      if (
        !moment().isBetween(
          moment(carport.schedule.start, 'HH:mm'),
          moment(carport.schedule.end, 'HH:mm'),
        )
      ) {
        console.log('time not in between');
        return false;
      }
    }
  }

  return true;
}

export async function getUserReservationHistory(user_id) {
  const currentTime = moment().unix();
  console.log(currentTime);
  const query = db
    .collection('reservations')
    .where('user_id', '==', user_id)
    .orderBy('end', 'desc')
    .limit(10);

  let reservations = await query.get().then(querySnapshot => {
    var resList = [];
    querySnapshot.forEach(doc => {
      resList.push({
        id: doc.id,
        data: doc.data(),
      });
    });
    return resList;
  });

  return reservations;
}

export async function getCurrentUserReservations(user_id) {
  const currentTime = moment().unix();
  const query = db
    .collection('reservations')
    .where('user_id', '==', user_id)
    .where('end', '>=', currentTime)
    .orderBy('end', 'desc')
    .limit(10);

  let reservations = await query.get().then(querySnapshot => {
    var resList = [];
    querySnapshot.forEach(doc => {
      resList.push({
        id: doc.id,
        data: doc.data(),
      });
    });
    return resList;
  });

  return reservations;
}

export async function createReservation(
  user_id,
  user_data,
  carport_id,
  carport_data,
  start,
  end,
  vehicle_id,
  vehicle_data,
  price,
  hours,
) {
  const batch = db.batch();

  const newReservation = {
    date_created: moment().unix(),
    user_id,
    user_data,
    start,
    end,
    vehicle_id,
    vehicle_data,
    carport_id,
    carport_data,
    price,
    hours,
  };

  const rootRef = db.collection('reservations').doc();

  const docRef = db
    .collection('carports')
    .doc(carport_id)
    .collection('reservations')
    .doc(rootRef.id);

  batch.set(rootRef, newReservation);
  batch.set(docRef, newReservation);

  let batchResult = await batch
    .commit()
    .then(res => {
      console.log('new reservation created', res);
      return true;
    })
    .catch(err => {
      console.error(err);
      return false;
    });

  return batchResult;
}
