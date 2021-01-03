const admin = require('firebase-admin');

exports.carportMetrics = (snap, context, store) => {
  const data = snap.data();
  const {accomodations, type, available_spaces, owner_id} = data;
  const updateData = {
    accomodations: {
      compact_only:
        accomodations.compact_only && admin.firestore.FieldValue.increment(1),
      covered_space:
        accomodations.covered_space && admin.firestore.FieldValue.increment(1),
      ev_charging:
        accomodations.ev_charging && admin.firestore.FieldValue.increment(1),
      low_clearance:
        accomodations.low_clearance && admin.firestore.FieldValue.increment(1),
      no_reentry:
        accomodations.no_reentry && admin.firestore.FieldValue.increment(1),
      parallel:
        accomodations.parallel && admin.firestore.FieldValue.increment(1),
    },
    types: {
      driveway: type === 'driveway' && admin.firestore.FieldValue.increment(1),
      parkinglot:
        type === 'parkinglot' && admin.firestore.FieldValue.increment(1),
      garage: type === 'garage' && admin.firestore.FieldValue.increment(1),
      structure:
        type === 'structure' && admin.firestore.FieldValue.increment(1),
    },
    total_parking_spaces: admin.firestore.FieldValue.increment(
      parseInt(available_spaces, 10),
    ),
    total_carports: admin.firestore.FieldValue.increment(1),
  };

  store.doc(`carport_metrics/${context.params.carportId}`).set({
    amount_earned_gross: 0,
    amount_earned_net: 0,
    amount_refunded: 0,
    date_created: new Date(),
    hours_parked: 0,
    total_parking: 0,
    owner_id: owner_id,
  });

  store.doc('metrics/carports').update(updateData);

  return true;
};

exports.reservationMetrics = (snap, context, store) => {
  const data = snap.data();
  const {hours, price, user_id, carport_id, carport_data} = data;

  //update total reservations metrics
  store.doc('metrics/reservations').set(
    {
      total_hours: admin.firestore.FieldValue.increment(parseInt(hours, 10)),
      total_reservations: admin.firestore.FieldValue.increment(1),
      gross_income: admin.firestore.FieldValue.increment(parseFloat(price)),
    },
    {merge: true},
  );

  //update user metrics
  store.doc(`user_metrics/${user_id}`).set(
    {
      amount_refunded: admin.firestore.FieldValue.increment(0),
      amount_spent: admin.firestore.FieldValue.increment(parseFloat(price)),
      hours_parked: admin.firestore.FieldValue.increment(parseInt(hours, 10)),
      parking_purchases: admin.firestore.FieldValue.increment(1),
    },
    {merge: true},
  );

  //update carport metrics
  store.doc(`carport_metrics/${carport_id}`).set(
    {
      amount_refunded: admin.firestore.FieldValue.increment(0),
      amount_earned_gross: admin.firestore.FieldValue.increment(
        parseFloat(price),
      ),
      amount_earned_net: admin.firestore.FieldValue.increment(0),
      hours_parked: admin.firestore.FieldValue.increment(parseInt(hours, 10)),
      total_parking: admin.firestore.FieldValue.increment(1),
      owner_id: carport_data.owner_id,
    },
    {merge: true},
  );

  return true;
};

exports.userMetrics = (snap, context, store) => {
  const data = snap.data();

  store.doc('metrics/users').update({
    total_users: admin.firestore.FieldValue.increment(1),
  });

  store.doc(`user_metrics/${context.params.user_id}`).set({
    amount_refunded: 0,
    amount_spent: 0,
    hours_parked: 0,
    parking_purchases: 0,
  });

  return true;
};
