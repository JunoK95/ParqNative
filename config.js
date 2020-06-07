import {
  STRIPE_PUBLISHABLE_KEY_PROD,
  STRIPE_PUBLISHABLE_KEY_TEST,
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_DATABASE_URL,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID,
  FIREBASE_API_KEY_ALPHA,
  FIREBASE_AUTH_DOMAIN_ALPHA,
  FIREBASE_PROJECT_ID_ALPHA,
  FIREBASE_DATABASE_URL_ALPHA,
  FIREBASE_STORAGE_BUCKET_ALPHA,
  FIREBASE_MESSAGING_SENDER_ID_ALPHA,
  FIREBASE_APP_ID_ALPHA,
  FIREBASE_MEASUREMENT_ID_ALPHA,
} from 'react-native-dotenv';

const dev = {
  firebase_config: {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    databaseURL: FIREBASE_DATABASE_URL,
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
    appId: FIREBASE_APP_ID,
    measurementId: FIREBASE_MEASUREMENT_ID,
  },
  firebase_functions_url_base:
    'https://us-central1-parq-dev.cloudfunctions.net/',
  // stripe_publishable_key: STRIPE_PUBLISHABLE_KEY_TEST,
  stripe_publishable_key: STRIPE_PUBLISHABLE_KEY_PROD,
};

const prod = {
  firebase_config: {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    databaseURL: FIREBASE_DATABASE_URL,
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
    appId: FIREBASE_APP_ID,
    measurementId: FIREBASE_MEASUREMENT_ID,
  },
  firebase_functions_url_base:
    'https://us-central1-parq-dev.cloudfunctions.net/',
  stripe_publishable_key: STRIPE_PUBLISHABLE_KEY_PROD,
};

export const config = process.env.NODE_ENV === 'development' ? dev : prod;
