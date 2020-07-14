import Axios from 'axios';
import {config} from '../config';
import {createFirebaseAuthHeader} from './header_functions';

export const twilioCreateVerificationService = async () => {
  const authHeader = await createFirebaseAuthHeader();
  let service_sid;
  try {
    service_sid = await Axios({
      headers: authHeader,
      method: 'POST',
      url: `${
        config.firebase_functions_url_base
      }twilioCreateVerificationService`,
    });
  } catch (error) {
    throw error;
  }

  return service_sid;
};
