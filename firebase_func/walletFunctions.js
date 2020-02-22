import firebase from '../firebase';
import moment from 'moment';

const db = firebase.firestore();

export async function getWallet(user_id) {
  const wallet = await db
    .collection('wallets')
    .doc(user_id)
    .get()
    .then(doc => {
      if (!doc.exists) {
        console.log('Wallet does not exist');
      } else {
        return doc.data();
      }
    })
    .catch(err => console.error(err));

  return wallet;
}

export async function createCoinPurchase(user_id, amount, stripe_metadata) {
  const purchaseObj = {
    type: 'add_credit',
    role: 'add balance',
    user_id,
    amount,
    date_created: moment().unix(),
    stripe_metadata,
  };

  const purchase = await db
    .collection('purchases')
    .add(purchaseObj)
    .then(ref => {
      console.log('Added Purchase with Id: ', ref.id);
      return true;
    })
    .catch(err => {
      console.error(err);
      return false;
    });

  return purchase;
}

export async function chargeWallet(user_id, amount, role, metadata) {
  const chargeObj = {
    type: 'charge_credit',
    role,
    user_id,
    amount,
    date_created: moment().unix(),
    metadata,
  };

  if (amount > 0) {
    amount = amount * -1;
  }

  const walletCharge = await db
    .collection('wallets')
    .doc(user_id)
    .update({
      credit: firebase.firestore.FieldValue.increment(amount),
    })
    .then(res => {
      return true;
    })
    .catch(err => {
      console.error(err);
      return false;
    });

  console.log(walletCharge);

  if (walletCharge) {
    db.collection('walletCharges').add(chargeObj);
    return true;
  }
  return false;
}
