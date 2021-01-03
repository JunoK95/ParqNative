const functions = require('firebase-functions');
const stripe = require('stripe')(functions.config().stripe.keys.secret_key);

const webhookAccountSig = functions.config().stripe.keys.webhook.account_signing;
const webhookChargeSig = functions.config().stripe.keys.webhook.charge_signing;

exports.stripeAccountEvents = (request, response, store) => {
  let event;
  let sig = request.headers['stripe-signature'];
  try {
    event = stripe.webhooks.constructEvent(
      request.rawBody,
      sig,
      webhookAccountSig,
    );
    console.log('Webhook Event = ', event);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
  }

  const {object} = event.data;

  //Handle Account Webhooks
  switch (event.type) {
    case 'account.updated':
      console.log('ACCOUNT UPDATED');
      if (object.tos_acceptance) {
        store
          .collection('wallets')
          .doc(object.metadata.user_id)
          .update({stripe_account_verified: true});
      }
      response.status(200).send(object);
      break;
    case 'account.external_account.created':
      console.log('BANK ACCOUNT ADDED');
      response.status(200).send(object);
      break;
    case 'account.external_account.deleted':
      console.log('BANK ACCOUNT DELETED');
      response.status(200).send(object);
      break;
    default:
      response.status(200).send(event);
      break;
  }
};

exports.stripeChargeEvents = (request, response, store) => {
  let event;
  let sig = request.headers['stripe-signature'];
  try {
    event = stripe.webhooks.constructEvent(
      request.rawBody,
      sig,
      webhookChargeSig,
    );
    console.log('Webhook Event = ', event);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case 'charge.succeeded':
      console.log('CHARGE SUCCEEDED');
      break;
    case 'customer.sources.created':
      console.log('CUSTOMER SOURCES CREATED');
      break;
    case 'payment_method.attached':
      console.log('PAYMENT METHOD ATTACHED');
      break;
    case 'charge.refund.updated':
      console.log('CHARGE REFUNDED');
      break;
    default:
      break;
  }

  response.status(200).end();
};
