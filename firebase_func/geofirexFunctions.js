import firebase from '../firebase';
import * as geofirex from 'geofirex';
import {get} from 'geofirex';

let db = firebase.firestore();
let geo = geofirex.init(firebase);

export async function geofirexCreatePoint(lat, lng) {
  const geopoint = geo.point(lat, lng);
  return geopoint;
}

export async function geofirexQueryPoints(center, radius, field) {
  const {lat, lng} = center;
  const collection = db.collection('carports');
  const geoCenter = geo.point(lat, lng);
  const points = geo.query(collection).within(geoCenter, radius, field);

  const hits = await get(points);
  console.log('HITS', hits);

  const filteredHits = hits.filter(port => {
    let ifTrue = true;
    if (!port.enabled) {
      ifTrue = false;
    }
    return ifTrue;
  });

  return filteredHits;
}

export async function geofirexUpdateCarport(id, lat, lng) {
  const geopoint = geo.point(lat, lng);
  db.collection('carports')
    .doc(id)
    .update({geopointx: geopoint});
}
