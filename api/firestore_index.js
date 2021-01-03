import Axios from 'axios';
import {createFirebaseAuthHeader} from './header_functions';
import {config} from '../config';

export const getUserContactInfo = async user_id => {
  const authHeader = createFirebaseAuthHeader();
  let response;
  try {
    response = await Axios({
      headers: authHeader,
      method: 'POST',
      url: `${config.firebase_functions_url_base}getUserContactInfo`,
      data: {
        user_id,
      },
    });
  } catch (error) {
    response = {error};
  }

  return response;
};

export const getCarportDataWithFees = async carport_id => {
  const authHeader = createFirebaseAuthHeader();
  let returnValue;
  try {
    const response = await Axios({
      headers: authHeader,
      method: 'POST',
      url: `${config.firebase_functions_url_base}getCarportDataWithFees`,
      data: {
        carport_id,
      },
    });
    returnValue = response.data;
  } catch (error) {
    returnValue = {error};
  }

  return returnValue;
};

export const sendLog = async (type, message, description) => {
  const authHeader = createFirebaseAuthHeader();
  let response;
  try {
    response = await Axios({
      headers: authHeader,
      method: 'POST',
      data: {
        type,
        message,
        description,
      },
      url: `${config.firebase_functions_url_base}sendLog`,
    });
  } catch (error) {
    response = {error};
  }

  return response;
};
