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

export const stripeGetAccountInfo = async account_id => {
  const authHeader = await createFirebaseAuthHeader();
  let response;
  try {
    response = await Axios({
      headers: authHeader,
      method: 'POST',
      url: `${config.firebase_functions_url_base}stripeGetAccount`,
      data: {
        account_id,
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

export const stripeListCustomerCards = async customer_id => {
  const authHeader = await createFirebaseAuthHeader();
  let response;
  try {
    response = await Axios({
      headers: authHeader,
      method: 'POST',
      url: `${config.firebase_functions_url_base}stripeListCards`,
      data: {
        customer_id,
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
