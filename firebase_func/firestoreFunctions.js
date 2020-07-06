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

export async function initializeCarportWithParams(
  owner_id,
  address,
  available_spaces,
  features,
  type,
  parking_instructions,
  description,
) {
  const {formatted_address, geometry, place_id} = address;
  const currentTime = moment().unix();
  const geoHash = encode(geometry.location.lat, geometry.location.lng);
  const geofirepoint = await geofirexCreatePoint(
    geometry.location.lat,
    geometry.location.lng,
  );
  var docData = {
    enabled: false,
    verfied: false,
    owner_id: owner_id,
    date_created: currentTime,
    date_updated: currentTime,
    price_hr: 3.0,
    price_day: 6.0,
    available_spaces: available_spaces,
    taken_spaces: 0,
    parking_instructions: parking_instructions,
    description: description,
    type: type,
    accomodations: {
      compact_only: false,
      large_vehicle: false,
      ev_charging: false,
      nearby_commute: false,
      covered_space: false,
      ...features,
    },
    schedule: {
      start: '00:00',
      end: '23:00',
      allday: true,
    },
    location: {
      address: formatted_address,
      coordinates: geometry.location,
      place_id: place_id,
      geohash: geoHash,
    },
    geopointx: geofirepoint,
    game_data: {
      incubator_type: 'default',
    },
  };

  var newCarportRef = db.collection('carports').doc();
  var returnVal = await newCarportRef
    .set(docData)
    .then(docRef => {
      console.log('Document Written', docRef);
      return true;
    })
    .catch(err => console.error(err));

  if (returnVal) {
    return newCarportRef.id;
  }
  return false;
}

export async function initializeNewCarport(address, owner_id) {
  const {formatted_address, geometry, place_id} = address;
  const currentTime = moment().unix();
  const geoHash = encode(geometry.location.lat, geometry.location.lng);
  const geofirepoint = await geofirexCreatePoint(
    geometry.location.lat,
    geometry.location.lng,
  );
  console.log(address);
  console.log('geofirepoint', geofirepoint);
  var docData = {
    enabled: false,
    verfied: false,
    owner_id: owner_id,
    date_created: currentTime,
    date_updated: currentTime,
    price_hr: 2.0,
    price_day: 6.0,
    available_spaces: 1,
    taken_spaces: 0,
    description: '',
    accomodations: {
      compact_only: false,
      large_vehicle: false,
      ev_charging: false,
      nearby_commute: false,
      covered_space: false,
    },
    schedule: {
      start: '05:00',
      end: '10:00',
      allday: true,
    },
    location: {
      address: formatted_address,
      coordinates: geometry.location,
      place_id: place_id,
      geohash: geoHash,
    },
    geopointx: geofirepoint,
    game_data: {
      incubator_type: 'default',
    },
  };

  var newCarportRef = db.collection('carports').doc();
  var returnVal = await newCarportRef
    .set(docData)
    .then(docRef => {
      console.log('Document Written', docRef);
      return docRef;
    })
    .catch(err => console.error(err));

  if (returnVal) {
    return newCarportRef.id;
  }
  return newCarportRef.id;
}

export async function getCarportData(onwer_id) {
  var data = {};
  await db
    .collection('carports')
    .doc(onwer_id)
    .get()
    .then(function(doc) {
      if (doc.exists) {
        data = doc.data();
      } else {
        data = {error: `carport ${onwer_id} doesn't exist`};
      }
    })
    .catch(error => {
      data = error;
      console.error('get user data error => ', error);
    });

  return data;
}

export async function getOwnedCarports(owner_id) {
  var ownedCarports = await db
    .collection('carports')
    .where('owner_id', '==', owner_id)
    .get()
    .then(querySnapshot => {
      var carportArray = [];
      querySnapshot.forEach(doc => {
        carportArray.push({data: doc.data(), id: doc.id});
      });
      console.log('carport array', carportArray);
      return carportArray;
    });
  console.log(ownedCarports);
  return ownedCarports;
}

export async function activateCarport(port_id, updates) {
  var returnVal = await db
    .collection('carports')
    .doc(port_id)
    .set(
      {
        ...updates,
        date_updated: moment().unix(),
        enabled: true,
      },
      {merge: true},
    )
    .then(() => {
      return true;
    })
    .catch(error => {
      console.error(error);
      return false;
    });

  return returnVal;
}

export async function deactivateCarport(port_id) {
  var returnVal = await db
    .collection('carports')
    .doc(port_id)
    .update({enabled: false})
    .then(() => {
      return true;
    })
    .catch(error => {
      console.error(error);
      return false;
    });

  return returnVal;
}

export async function updateCarportData(port_id, data) {
  console.log('@updateCarportData', data);
  const newdata = {
    ...data,
    date_updated: moment().unix(),
  };
  var returnVal = await db
    .collection('carports')
    .doc(port_id)
    .update(newdata)
    .then(res => {
      return res;
    });

  return returnVal;
}

export async function batchUpdateCarportData(carports) {
  var batch = db.batch();
  for (let key in carports) {
    const ref = db.collection('carports').doc(key);
    batch.update(ref, carports[key]);
  }
  var batchResult = await batch.commit().then(result => {
    console.log(result);
    return result;
  });

  return batchResult;
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

export async function addSaveLocation(
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

export async function getVehicle(vehicle_id) {
  const vehicleRef = db.collection('vehicles').doc(vehicle_id);

  const vehicleData = await vehicleRef.get().then(doc => {
    if (doc.exists) {
      const data = doc.data();
      console.log('vehicle exists', data);
      return {id: doc.id, data: data};
    } else {
      console.error('document does not exist');
      return false;
    }
  });

  return vehicleData;
}

export async function addVehicle(owner_id, updates) {
  var batch = db.batch();

  const newVehicleData = {
    owner_id,
    date_created: moment().unix(),
    date_updated: moment().unix(),
    ...updates,
  };

  let vehicleDoc = db.collection('vehicles').doc();
  // let userVehicleDoc = db.collection('users').doc(owner_id).collection('owned_vehicles').doc(vehicleDoc.id)
  batch.set(vehicleDoc, newVehicleData);
  // batch.set(userVehicleDoc, newVehicleData)

  var batchResult = await batch
    .commit()
    .then(res => {
      console.log('Added New Vehicle to db', res);
      return true;
    })
    .catch(err => {
      console.error(err);
      return false;
    });

  if (batchResult) {
    return {id: vehicleDoc.id, data: newVehicleData};
  } else {
    return batchResult;
  }
}

export async function getSavedVehicles(user_id) {
  let vehicleQuery = db.collection('vehicles').where('owner_id', '==', user_id);
  let returnVal = vehicleQuery
    .get()
    .then(querySnapshot => {
      let vehicles = [];
      querySnapshot.forEach(doc => {
        vehicles.push({id: doc.id, data: doc.data()});
      });
      return vehicles;
    })
    .catch(err => console.error(err));

  return returnVal;
}

export async function deleteVehicle(vehicle_id) {
  let vehicleQuery = db.collection('vehicles').doc(vehicle_id);
  let returnVal = await vehicleQuery
    .delete()
    .then(res => {
      console.log(`vehicle ${vehicle_id} deleted `, res);
      return true;
    })
    .catch(err => console.error('Error Removing Vehicle', err));

  return returnVal;
}
