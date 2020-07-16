const functions = require('firebase-functions');
const cors = require('cors')({origin: true});
const header_verification = require('../header_verification');

var accountSid = functions.config().twilio.account_sid;
var authToken = functions.config().twilio.auth_token;

const client = require('twilio')(accountSid, authToken);

exports.twilioCreateVerificationService = functions.https.onRequest(
  (request, response) => {
    cors(request, response, async () => {
      const verified = await header_verification.isAuthenticated(request);
      if (!verified) {
        response.status(403).send('Unauthorized! Missing auth token');
        return;
      }
      const {phone_number} = request.body;
      let service;
      try {
        service = await client.verify.services.create({
          friendlyName: 'Verification Service',
          codeLength: 4,
        });
        console.log('VERIFICATION SERVICE =>', service.sid);
      } catch (error) {
        console.error('Unable to Create Verication Service');
        response.status(500).send(error);
        return;
      }

      if (service) {
        try {
          const verification = await client.verify
            .services(service.sid)
            .verifications.create({to: phone_number, channel: 'sms'});

          console.log('VERIFICATION SENT =>', verification);
          response.status(200).send(service.sid);
        } catch (error) {
          console.error('Unable to Send Verification');
          response.status(500).send(error);
          return;
        }
      }

      return;
    });
  },
);

exports.twilioCheckCodeVerification = functions.https.onRequest(
  (request, response) => {
    cors(request, response, async () => {
      //Firebase header verification
      const verified = await header_verification.isAuthenticated(request);
      if (!verified) {
        response.status(403).send('Unauthorized! Missing auth token');
        return;
      }
      //Param verification
      const {phone_number, code, service_sid} = request.body;
      if (!phone_number || !code || !service_sid) {
        response.status(400).send('Missing Parameters');
      }
      try {
        const statusResponse = await client.verify
          .services(service_sid)
          .verificationChecks.create({
            to: phone_number,
            code: code,
          });
        response.status(200).send(statusResponse.status);
      } catch (error) {
        console.error(error);
        response.status(500).send('Unable to check code verification');
      }
    });
  },
);
