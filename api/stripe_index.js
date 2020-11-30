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
