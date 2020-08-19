const admin = require('firebase-admin');

exports.referralCreated = async (snap, context, store) => {
  try {
    const {referrer_email, referrer_uid, user_uid} = snap.data();
    await store
      .doc(`users/${user_uid}`)
      .set({referred_by: referrer_uid}, {merge: true});

    await store.doc(`user_metrics/${user_uid}`).set(
      {
        referred_total_count: admin.firestore.FieldValue.increment(1),
      },
      {merge: true},
    );

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

exports.referralRedeemed = (change, context, store) => {
  try {
    if (!change.before.data().redeemed && change.after.data().redeemed) {
      const {user_uid} = change.after.data();
      store.doc(`user_metrics/${user_uid}`).set(
        {
          referred_redeemed: admin.firestore.FieldValue.increment(1),
        },
        {merge: true},
      );
    }

    return true;
  } catch (error) {
    return false;
  }
  
};
