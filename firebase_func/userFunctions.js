import firebase from '../firebase';
import moment from 'moment';
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

export async function sendPWResetEmail(email) {
  try {
    await firebase.auth().sendPasswordResetEmail(email);
    return true;
  } catch (error) {
    throw error;
  }
}
