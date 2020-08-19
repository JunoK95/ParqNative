import firebase from '../../firebase';
import moment from 'moment';
import {referralCodeSuffixGenerator} from '../../helpers/random-code-generator';
import { updateUserData } from '../userFunctions';

const db = firebase.firestore();

export async function getUserIdByEmail(email) {
  const querySnapshot = await db
    .collection('users')
    .where('email', '==', email)
    .get();

  if (querySnapshot.empty) {
    throw new Error(`User ${email} Not Found`);
  } else {
    return querySnapshot[0].id;
  }
}

export async function getUserIdByReferralCode(code) {
  const querySnapshot = await db
    .collection('users')
    .where('referral_code', '==', 'dajbubblezng0')
    .get();

  if (querySnapshot.empty) {
    console.log('Snap Empty');
    throw new Error(`${code} Not Found`);
  } else {
    return querySnapshot[0].id;
  }
}

export async function generateReferralCode(uid, user_data) {
  const {display_name, referral_code} = user_data;
  const suffix = referralCodeSuffixGenerator(5);
  let newCode = display_name + '#' + suffix;

  if (referral_code) {
    console.log('User already has a code');
    return;
  }

  try {
    const querySnapshot = await db
      .collection('referral_promo_codes')
      .where('code', '==', newCode)
      .get();

    if (querySnapshot.empty && !referral_code) {
      console.log('Query Empty');
      await db
        .collection('referral_promo_codes')
        .doc()
        .set({
          date_created: moment().unix(),
          type: 'referral',
          code: newCode,
          user_id: uid,
          used_count: 0,
          expiration_date: 'none',
        });

      return newCode;
    } else {
      console.log('Code Already Exists');
      return null;
    }
  } catch (error) {
    throw error;
  }
}

export async function createReferral(user_uid, user_email, referrer_email) {
  const referrer_id = getUserIdByEmail(referrer_email);
  if (referrer_id) {
    try {
      await db
        .collection('referrals')
        .doc()
        .set({
          date_created: moment().unix(),
          referrer_email: referrer_email,
          referrer_uid: referrer_id,
          user_uid: user_uid,
          user_email: user_email,
          redeemed: false,
        });
    } catch (error) {
      throw error;
    }
  } else {
    console.error(`No User with ${referrer_email} found`);
  }
}
