import firebase from '../firebase';
import axios from 'axios';
import moment from 'moment';
import {GeoFirestore} from 'geofirestore';
import {encode} from 'ngeohash';
import {geofirexCreatePoint} from './geofirexFunctions';
import {
  stripeAssignCustomerId,
  stripeAssignConnectAccountId,
} from '../api/stripe_index';

const db = firebase.firestore();

export async function initializeDefaultUser(id, email, newName) {
  console.log('initialData Email => ', email);
  let newDisplayName = newName;
  if (newName) {
    newDisplayName = newName;
  }

  //Assign Stripe Customer and Account Ids
  let stripe_customer_id;
  let stripe_connect_id;

  const stripe_customer_id_response = await stripeAssignCustomerId({
    email: email,
    user_id: id,
  });
  if (stripe_customer_id_response.error) {
    console.error('ERROR INITIALIZING CUSTOMER ID');
  } else {
    stripe_customer_id = stripe_customer_id_response.data.id;
  }

  const stripe_connect_id_response = await stripeAssignConnectAccountId({
    email: email,
    user_id: id,
    metadata: {
      user_id: id,
      description: 'Assigning Stripe Account',
    },
  });

  if (stripe_connect_id_response.error) {
    console.error('ERROR INITIALIZING CONNECT ID');
  } else {
    stripe_connect_id = stripe_connect_id_response.data.id;
  }

  //Setup Wallet
  const defaultWalletData = {
    credit: 0,
    object: 'wallet',
    user_id: id,
    stripe_account_verified: false,
    payout_balance: 0,
  };

  //Setup Default Data
  const defaultUserData = {
    date_joined: moment().unix(),
    date_updated: moment().unix(),
    owned_carports: [],
    saved_locations: [],
    display_name: newDisplayName,
    email: email,
    photo_url: '',
    stripe_customer_id: stripe_customer_id,
    stripe_account_id: stripe_connect_id,
    contact: {
      email: email,
      phone: '',
    },
    billing_address: {},
  };

  let docData = db.collection('users').doc(id);
  await docData.set(defaultUserData, {merge: true});

  let walletRef = db.collection('wallets').doc(id);
  await walletRef.set(defaultWalletData).then(doc => {
    console.log('wallet written');
  });

  return defaultUserData;
}

export async function getUserData(id) {
  var data = {};

  await db
    .collection('users')
    .doc(id)
    .get()
    .then(function(doc) {
      if (doc.exists) {
        data = doc.data();
      } else {
        data = {
          error: {
            code: 404,
            message: `user ${id} doesn't exist`,
          },
        };
      }
    })
    .catch(error => {
      console.error('get user data error => ', error);
    });

  return data;
}

export async function updateDisplayName(user_id, display_name) {
  await db
    .collection('users')
    .doc(user_id)
    .update({
      date_updated: moment().unix(),
      display_name,
    })
    .then(res => {
      console.log('updated display name', res);
    });
}

export async function updateUserData(user_id, data) {
  const success = await db
    .collection('users')
    .doc(user_id)
    .set(
      {
        date_updated: moment().unix(),
        ...data,
      },
      {merge: true},
    )
    .then(res => {
      console.log('updated user data', res);
      return true;
    })
    .catch(err => {
      console.log(err);
      return false;
    });
  return success;
}

export async function updateStripeId(user_id, stripe_customer_id) {
  await db
    .collection('users')
    .doc(user_id)
    .set(
      {
        stripe_customer_id: stripe_customer_id,
        date_updated: moment().unix(),
      },
      {merge: true},
    )
    .then(res => {
      console.log('updated stripe_customer_id name', res);
    });
}

export async function updateWallet(user_id, updates) {
  await db
    .collection('wallets')
    .doc(user_id)
    .set(
      {
        stripe_account_verified: true,
        ...updates,
      },
      {merge: true},
    );
}

export async function setStripeAccountId(user_id, stripe_account_id) {
  await db
    .collection('users')
    .doc(user_id)
    .set(
      {
        stripe_account_id: stripe_account_id,
        date_updated: moment().unix(),
      },
      {merge: true},
    )
    .then(res => {
      console.log('updated stripe_account_id', res);
    });
}

export async function getGeocodeAddress(address) {
  var result = await axios({
    method: 'get',
    url: 'https://maps.googleapis.com/maps/api/geocode/json',
    params: {
      address: address,
      key: 'AIzaSyDH_piMcJHJJQLW3WjyLTZo0ICSbHbNXZ0',
    },
  })
    .then(res => {
      return res;
    })
    .catch(err => console.error('geocode error', err));

  return result;
}

export async function queryNearbyGeocode() {
  const geoFirestore = new GeoFirestore(db);
  const geoCollection = geoFirestore.collection('carports');
  geoCollection
    .doc('test0')
    .get()
    .then(res => console.log(res.data()));
  const query = geoCollection.near({
    center: new firebase.firestore.GeoPoint(40.6568523, -111.956537),
    radius: 100000,
  });
  query.get().then(value => {
    console.log('docs', value); // All docs returned by GeoQuery
  });
}

export async function queryNearbyCoordinates(
  min_lat,
  max_lat,
  min_lng,
  max_lng,
) {
  let latBounds = await db
    .collection('carports')
    .where('location.coordinates.lat', '>', min_lat)
    .where('location.coordinates.lat', '<', max_lat)
    .get()
    .then(function(querySnapshot) {
      let ids = [];
      querySnapshot.forEach(function(doc) {
        // console.log('latBounds', doc.id, "=>", doc.data())
        ids.push(doc.id);
      });
      return ids;
    })
    .catch(err => console.error('error getting documents', err));

  let lngBounds = await db
    .collection('carports')
    .where('location.coordinates.lng', '>', min_lng)
    .where('location.coordinates.lng', '<', max_lng)
    .get()
    .then(snapshot => {
      snapshot.forEach(function(doc) {});
      return snapshot.docs;
    })
    .catch(err => console.error('error getting documents', err));

  console.log('lngBounds', lngBounds);
  console.log('latbounds', latBounds);

  let inclusiveBounds = lngBounds.filter(carport => {
    return latBounds.includes(carport.id);
  });

  inclusiveBounds = inclusiveBounds.map(carport => {
    return {
      id: carport.id,
      data: carport.data(),
    };
  });

  console.log(inclusiveBounds);
  return inclusiveBounds;
}

export async function getCurrentReservations(carport) {
  console.log('Carport ID ', carport.id, 'current time ', moment().unix());
  const query = db
    .collection('carports')
    .doc(carport.id)
    .collection('reservations')
    .where('end', '>', moment().unix());

  let reservations = await query.get().then(querySnapshot => {
    var resList = {};
    querySnapshot.forEach(doc => {
      resList[doc.id] = doc.data();
    });
    return resList;
  });

  console.log('Reservations', reservations);
  return reservations;
}

export async function checkCarportAvailablity(carport) {
  const query = db
    .collection('carports')
    .doc(carport.id)
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
    console.log('reservation full');
    return false;
  }

  if (reskeys.length > parseInt(carport.available_spaces, 10)) {
    console.error('carport Overbooked!');
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
      console.log('time not in between');
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
  console.log(currentTime);
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

  console.log(newReservation);

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
