import Axios from 'axios';
import {createFirebaseAuthHeader} from './header_functions';
import {config} from '../config';

export const calculateParkingPrices = async (carport_id, hours) => {
  const authHeader = createFirebaseAuthHeader();
  let returnValue;
  try {
    const response = await Axios({
      headers: authHeader,
      method: 'POST',
      url: `${config.firebase_functions_url_base}calculateParkingPrices`,
      data: {
        carport_id,
        hours,
      },
    });
    returnValue = response.data;
  } catch (error) {
    returnValue = {error};
  }

  return returnValue;
};
