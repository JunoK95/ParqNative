import firebase from '../firebase';
import moment from 'moment';

const db = firebase.firestore();

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

export async function getUserVehicles(user_id) {
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

export async function deleteVehicle(vehicle_id) {
  let vehicleQuery = db.collection('vehicles').doc(vehicle_id);
  try {
    await vehicleQuery.delete();
    console.log(`VEHICLE DELETED => ${vehicle_id}`);
    return true;
  } catch (error) {
    throw error;
  }
}
