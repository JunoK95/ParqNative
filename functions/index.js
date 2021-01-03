const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});
const stripe = require('stripe')(functions.config().stripe.keys.secret_key);

const header_verification = require('./header_verification');
const metrics = require('./metrics');
const stripe_functions = require('./stripe_functions/stripe_functions');
const stripe_webhooks = require('./stripe_functions/stripe_webhooks');
const twilio_verify_functions = require('./twilio_functions/twilio_verify_functions');
const referral_functions = require('./referral_functions/referral_functions');
const carport_functions = require('./carport_functions/carport_functions');
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

exports.stripeDeleteCard = stripe_functions.stripeDeleteCard;

exports.stripeCreateExternalAccount =
  stripe_functions.stripeCreateExternalAccount;

exports.stripeDeleteExternalAccount =
  stripe_functions.stripeDeleteExternalAccount;

exports.stripeListCards = stripe_functions.stripeListCards;

exports.stripePayParkingCharge = functions.https.onRequest(
  (request, response) => {
    cors(request, response, async () => {
      const verified = await header_verification.isAuthenticated(request);
      if (!verified) {
        response.status(403).send('Unauthorized! Missing auth token');
        return;
      }

      const {
        amount,
        description,
        token,
        port,
        customer_id,
        metadata,
        role,
      } = request.body;

      console.log('STRIPE PAY PARKING DATA =>', {
        amount,
        description,
        token,
        port,
        customer_id,
        metadata,
        role,
      });

      let destination_stripe_account;
      let stripe_fee = 30 + parseInt((amount, 10) * 0.03, 10);
      let destination_amount =
        parseInt(parseInt(amount, 10) * 0.8, 10) - stripe_fee;
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
            console.error('Error getting document', err);
          });
        console.log('port owner', portOwner);
        destination_stripe_account = portOwner.stripe_account_id;
      } catch (err) {
        console.error(err);
        response.status(400);
      }

      if (role === 'demo') {
        console.warn('USING DEMO ACCOUNT');
        response.status(200).send({demo: true});
      } else {
        stripe.charges.create(
          {
            amount: amount,
            currency: 'usd',
            description: description,
            metadata: metadata,
            customer: customer_id,
            source: token,
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
      }
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

exports.getCarportDataWithFees = functions.https.onRequest(
  (request, response) => {
    cors(request, response, () => {
      return carport_functions.getCarportDataWithFees(request, response, store);
    });
  },
);

exports.calculateParkingPrices = functions.https.onRequest(
  (request, response) => {
    cors(request, response, () => {
      return carport_functions.calculateParkingPrices(request, response, store);
    });
  },
);

exports.referralCreated = functions.firestore
  .document('referrals/{ref_id}')
  .onCreate((snap, context) => {
    return referral_functions.referralCreated(snap, context, store);
  });

exports.referralRedeemed = functions.firestore
  .document('referrals/{ref_id}')
  .onUpdate((change, context) => {
    return referral_functions.referralRedeemed(change, context, store);
  });

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
