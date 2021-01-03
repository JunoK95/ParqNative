import Axios from 'axios';
import {config} from '../config';
import {createFirebaseAuthHeader} from './header_functions';

export const stripePayParkingCharge = async data => {
  const authHeader = await createFirebaseAuthHeader();
  let response;
  try {
    response = await Axios({
      headers: authHeader,
      method: 'POST',
      url: `${config.firebase_functions_url_base}stripePayParkingCharge`,
      data,
    });
  } catch (error) {
    response = {error};
  }

  return response;
};

export const stripePayParkingWithCard = async (
  user_id,
  user_data,
  prices,
  hours,
  port,
  customer_id,
  vehicle,
  card_token,
) => {
  let role = user_data.role ? user_data.role : 'user';
  const resData = {
    token: card_token,
    amount: prices.total_price,
    port: port,
    description: `User ${user_id} parked with Vehicle ${vehicle.data.license_plate}`,
    uid: user_id,
    customer_id: user_data.stripe_customer_id,
    metadata: {
      vehicle_license_plate: vehicle.data.license_plate,
      vehicle_owner_id: vehicle.data.owner_id,
      vehicle_us_state: vehicle.data.us_state,
      vehicle_year: vehicle.data.year,
      user_id: user_id,
      user_customer_id: user_data.stripe_customer_id,
      user_email: user_data.email,
      port_id: port.id,
      port_owner_id: port.owner_id,
      location_address: port.location.address,
      location_place_id: port.location.place_id,
      location_geohash: port.location.geohash,
      hours: hours,
      price_hr: port.price_hr,
      price_base: prices.base_price,
      price_stripe_fee: prices.stripe_fee,
      price_tax: prices.tax_fee,
    },
    role,
  };
  const authHeader = await createFirebaseAuthHeader();
  let response;
  try {
    response = await Axios({
      headers: authHeader,
      method: 'POST',
      url: `${config.firebase_functions_url_base}stripePayParkingCharge`,
      data: resData,
    });
  } catch (error) {
    response = {error};
  }

  return response;
};

export const stripeAssignCustomerId = async data => {
  const authHeader = await createFirebaseAuthHeader();
  let response;
  try {
    response = await Axios({
      headers: authHeader,
      method: 'POST',
      url: `${config.firebase_functions_url_base}stripeCreateNewCustomer`,
      data,
    });
  } catch (error) {
    response = {error};
  }

  return response;
};

export const stripeAssignConnectAccountId = async data => {
  const authHeader = await createFirebaseAuthHeader();
  let response;
  try {
    response = await Axios({
      headers: authHeader,
      method: 'POST',
      url: `${config.firebase_functions_url_base}stripeCreateAccount`,
      data,
    });
  } catch (error) {
    response = {error};
  }

  return response;
};

export const stripeGetAccountInfo = async (account_id, role) => {
  const authHeader = await createFirebaseAuthHeader();
  role = role ? role : 'user';
  let response;
  try {
    response = await Axios({
      headers: authHeader,
      method: 'POST',
      url: `${config.firebase_functions_url_base}stripeGetAccount`,
      data: {
        account_id,
        role,
      },
    });
  } catch (error) {
    response = {error};
  }

  return response;
};

export const stripeCreateCard = async (customer_id, token) => {
  const authHeader = await createFirebaseAuthHeader();
  let response;
  try {
    response = await Axios({
      headers: authHeader,
      method: 'POST',
      url: `${config.firebase_functions_url_base}stripeCreateCard`,
      data: {
        customer_id: customer_id,
        cardToken: token,
      },
    });
  } catch (error) {
    console.error('Error Creating Card', error);
    response = {error};
  }

  return response;
};

export const stripeDeleteCard = async (user_id, customer_id, token) => {
  const authHeader = await createFirebaseAuthHeader();
  let response;
  try {
    response = await Axios({
      headers: authHeader,
      method: 'POST',
      url: `${config.firebase_functions_url_base}stripeDeleteCard`,
      data: {
        uid: user_id,
        customer_id: customer_id,
        card_token: token,
      },
    });
  } catch (error) {
    console.error('Error Deleting Card', error);
    response = {error};
  }

  return response;
};

export const stripeListCustomerCards = async (customer_id, role) => {
  const authHeader = await createFirebaseAuthHeader();
  if (!role) {
    role = 'user';
  }
  let response;
  try {
    response = await Axios({
      headers: authHeader,
      method: 'POST',
      url: `${config.firebase_functions_url_base}stripeListCards`,
      data: {
        customer_id,
        role,
      },
    });
  } catch (error) {
    response = {error};
  }

  return response;
};

export const stripeAddExternalAccount = async (account_id, bankToken) => {
  const authHeader = await createFirebaseAuthHeader();
  let response;
  try {
    response = await Axios({
      headers: authHeader,
      method: 'POST',
      url: `${config.firebase_functions_url_base}stripeCreateExternalAccount`,
      data: {
        account_id,
        bankToken,
      },
    });
  } catch (error) {
    response = {error};
  }

  return response;
};

export const stripeUpdateAccountAndTOS = async (uid, account_id, updates) => {
  const authHeader = await createFirebaseAuthHeader();
  let response;
  try {
    console.log('STRIPE UPDATE WITH =>', uid, account_id, updates);
    response = await Axios({
      headers: authHeader,
      method: 'POST',
      url: `${config.firebase_functions_url_base}stripeUpdateAccountWithTOS`,
      data: {
        uid,
        account_id,
        updates,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const stripeDeleteExternalAccount = async (uid, account_id, bank_id) => {
  const authHeader = await createFirebaseAuthHeader();
  let response;
  try {
    response = await Axios({
      headers: authHeader,
      method: 'POST',
      url: `${config.firebase_functions_url_base}stripeDeleteExternalAccount`,
      data: {
        uid,
        account_id,
        bank_id,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
