import {
  STRIPE_PUBLISHABLE_KEY_PROD,
  STRIPE_PUBLISHABLE_KEY_TEST,
} from 'react-native-dotenv';

const dev = {
  firebase_functions_url_base:
    'https://us-central1-parq-dev.cloudfunctions.net/',
  stripe_publishable_key: STRIPE_PUBLISHABLE_KEY_TEST,
};

const prod = {
  firebase_functions_url_base:
    'https://us-central1-parq-alpha.cloudfunctions.net/',
  stripe_publishable_key: STRIPE_PUBLISHABLE_KEY_PROD,
};

export const config = process.env.NODE_ENV === 'development' ? dev : prod;
