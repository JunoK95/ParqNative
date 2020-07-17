const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});
const stripe = require('stripe')(functions.config().stripe.test.secret_key); //Change API Key On Launch

const header_verification = require('./header_verification');
const metrics = require('./metrics');
const stripe_functions = require('./stripe_functions/stripe_functions');
const stripe_webhooks = require('./stripe_functions/stripe_webhooks');
const twilio_verify_functions = require('./twilio_functions/twilio_verify_functions');
const logging = require('./logging');

admin.initializeApp(functions.config().firebase);

const store = admin.firestore();

exports.sendLog = logging.sendLog;

exports.stripeAccountEvents = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    return stripe_webhooks.stripeAccountEvents(request, response, store);
  });
});

exports.stripeChargeEvents = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    return stripe_webhooks.stripeChargeEvents(request, response, store);
  });
});

exports.stripeGetAccount = stripe_functions.stripeGetAccount;

exports.stripeUpdateAccount = stripe_functions.stripeUpdateAccount;

exports.stripeUpdateAccountWithTOS =
  stripe_functions.stripeUpdateAccountWithTOS;

exports.stripeCreateAccount = stripe_functions.stripeCreateAccount;

exports.stripeCreateNewCustomer = stripe_functions.stripeCreateNewCustomer;

exports.stripeCreateCard = stripe_functions.stripeCreateCard;

exports.stripeCreateExternalAccount =
  stripe_functions.stripeCreateExternalAccount;

exports.stripeListCards = stripe_functions.stripeListCards;

exports.stripePayParkingCharge = functions.https.onRequest(
  (request, response) => {
    cors(request, response, async () => {
      const verified = await header_verification.isAuthenticated(request);
      if (!verified) {
        response.status(403).send('Unauthorized! Missing auth token');
        return;
      }

      const {amount, description, token, port, metadata} = request.body;
      let destination_stripe_account;
      let destination_amount = parseInt(parseInt(amount, 10) * 0.8, 10);
      try {
        const portOwner = await store
          .collection('users')
          .doc(port.owner_id)
          .get()
          .then(doc => {
            if (!doc.exists) {
              console.log('No such document!');
            } else {
              return doc.data();
            }
          })
          .catch(err => {
            console.log('Error getting document', err);
          });
        console.log('port owner', portOwner);
        destination_stripe_account = portOwner.stripe_account_id;
      } catch (err) {
        response.status(400).send(err);
      }

      console.log(
        'Payment Token: ',
        token,
        'Destination Stripe Account: ',
        destination_stripe_account,
      );

      stripe.charges.create(
        {
          amount: amount,
          currency: 'usd',
          description: description,
          metadata: metadata,
          source: 'tok_visa', //replace with token when going live
          transfer_data: {
            destination: destination_stripe_account,
            amount: destination_amount,
          },
        },
        (err, charge) => {
          if (err) {
            console.error(err);
            response.status(500).send(err);
          } else {
            console.log(charge);
            response.status(200).send(charge);
          }
        },
      );
    });
  },
);

exports.stripeElementCharge = stripe_functions.stripeElementCharge;

exports.twilioCreateVerificationService =
  twilio_verify_functions.twilioCreateVerificationService;

exports.twilioCheckCodeVerification =
  twilio_verify_functions.twilioCheckCodeVerification;

exports.getUserContactInfo = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    const {user_id} = request.body;
    try {
      const userRef = store.collection('users').doc(user_id);
      userRef.get().then(doc => {
        if (!doc.exists) {
          response.status(404);
        } else {
          const {phone, email} = doc.data();
          response.status(200).send({phone, email});
        }
      });
    } catch (error) {
      response.status(500).send(error);
    }
  });
});

// exports.walletAddBalance = functions.firestore
//   .document('purchases/{purchaseId}')
//   .onCreate((snap, context) => {
//     const data = snap.data();
//     const {user_id, amount} = data;

//     console.log(data);
//     if (data.type === 'add_credit') {
//       const wallet = store
//         .doc(`wallets/${user_id}`)
//         .update({
//           credit: admin.firestore.FieldValue.increment(amount),
//         })
//         .then(res => {
//           return res;
//         })
//         .catch(err => {
//           return err;
//         });
//       return true;
//     }
//     return true;
//   });

exports.userMetrics = functions.firestore
  .document('users/{user_id}')
  .onCreate((snap, context) => {
    return metrics.userMetrics(snap, context, store);
  });

exports.reservationMetrics = functions.firestore
  .document('reservations/{reservationId}')
  .onCreate((snap, context) => {
    return metrics.reservationMetrics(snap, context, store);
  });

exports.carportMetrics = functions.firestore
  .document('carports/{carportId}')
  .onCreate((snap, context) => {
    return metrics.carportMetrics(snap, context, store);
  });
