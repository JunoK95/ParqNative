const functions = require('firebase-functions');
const {default: Axios} = require('axios');
const cors = require('cors')({origin: true});

const sendinBlueApiKey = functions.config().sendinblue.api_key;

const url = 'https://api.sendinblue.com/v3/smtp/email';

const header = {
  'api-key': sendinBlueApiKey,
  'content-type': 'application/json',
  accept: 'application/json',
};

exports.sendEmailReceipt = async (snap, context, store) => {
  const data = snap.data();
  const {user_data, carport_data, price, hours, start, end} = data;
  const {email, display_name} = user_data;
  const address = carport_data.location.address;

  try {
    await Axios({
      method: 'POST',
      headers: header,
      url: url,
      data: {
        sender: {
          name: 'Parq',
          email: 'hello@parq.tech',
        },
        to: [
          {
            name: display_name,
            email: email,
          },
        ],
        replyTo: {email: 'hello@parq.tech', name: 'Parq'},
        params: {
          FIRSTNAME: display_name,
          PRICE: price,
          HOURS: hours,
          STARTTIME: start,
          ENDTIME: end,
          ADDRESS: address,
        },
        templateId: 9,
      },
    });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};