import firebase from '../firebase';
import moment from 'moment';
import {encode} from 'ngeohash';
import {geofirexCreatePoint} from './geofirexFunctions';

const db = firebase.firestore();

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
  try {
    await newCarportRef.set(docData);
    return newCarportRef.id;
  } catch (error) {
    console.error(error);
    return false;
  }
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
      return carportArray;
    });
  console.log(`${owner_id} OWNED CARPORTS =>`, ownedCarports);
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
