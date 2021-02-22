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

exports.sendWelcomeEmail = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    const {user_name, user_email} = request.body;
    Axios({
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
            name: user_name,
            email: user_email,
          },
        ],
        replyTo: {email: 'hello@parq.tech', name: 'Parq'},
        params: {FIRSTNAME: user_name},
        templateId: 7,
      },
    })
      .then(res => {
        response.status(200).send(res);
      })
      .catch(err => {
        console.error(err);
        response.status(500).send(err);
      });
  });
});

exports.sendWelcomeEmail2 = async (snap, context, store) => {
  const data = snap.data();
  const {user_data, price, hours} = data;
  const {email, display_name} = user_data;
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
        params: {FIRSTNAME: display_name},
        templateId: 9,
      },
    });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
