const functions = require('firebase-functions');
const {default: Axios} = require('axios');
const cors = require('cors')({origin: true});

const sendinBlueApiKey = functions.config().sendinblue.api_key;

const header = {
  'api-key': sendinBlueApiKey,
  'content-type': 'application/json',
  accept: 'application/json',
};

exports.sendEmail = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    const {name, email, subject, message} = request.body;
    console.log(name, email, subject, message);
    Axios({
      method: 'POST',
      headers: header,
      url: 'https://api.sendinblue.com/v3/smtp/email',
      data: {
        sender: {
          name: name,
          email: email,
        },
        to: [
          {
            name: 'Parq',
            email: 'parqtech@gmail.com',
          },
        ],
        subject: subject,
        htmlContent: `<html><head></head><body><p>Hello,</p>${message}</p></body></html>`,
        headers: {
          'X-Mailin-custom':
            'custom_header_1:custom_value_1|custom_header_2:custom_value_2|custom_header_3:custom_value_3',
          charset: 'iso-8859-1',
        },
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

exports.createContact = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    const {email} = request.body;
    Axios({
      method: 'POST',
      headers: header,
      url: 'https://api.sendinblue.com/v3/contacts',
      data: {
        email,
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
