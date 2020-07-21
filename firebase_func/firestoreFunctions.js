import firebase from '../firebase';
import axios from 'axios';
import moment from 'moment';
import {GeoFirestore} from 'geofirestore';

const db = firebase.firestore();

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
