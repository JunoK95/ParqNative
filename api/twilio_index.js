import Axios from 'axios';
import {config} from '../config';
import {createFirebaseAuthHeader} from './header_functions';

export const twilioCreateVerificationService = async (phone_number, uid) => {
  try {
    let service_sid;
    const authHeader = await createFirebaseAuthHeader();
    service_sid = await Axios({
      headers: authHeader,
      method: 'POST',
      url: `${
        config.firebase_functions_url_base
      }twilioCreateVerificationService`,
      data: {
        phone_number,
        uid,
      },
    });
    return service_sid.data;
  } catch (error) {
    throw error;
  }
};

export const twilioCheckCodeVerification = async (
  service_sid,
  phone_number,
  code,
) => {
  try {
    let status = await Axios({
      method: 'POST',
      url: `${config.firebase_functions_url_base}twilioCheckCodeVerification`,
      data: {
        service_sid,
        phone_number,
        code,
      },
    });
    return status;
  } catch (error) {
    throw error;
  }
};
