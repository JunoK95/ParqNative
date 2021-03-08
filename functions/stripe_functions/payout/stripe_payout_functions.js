const functions = require('firebase-functions');
const cors = require('cors')({origin: true});
const stripe = require('stripe')(functions.config().stripe.keys.secret_key);
const header_verification = require('../../header_verification');

exports.stripeListUserPayouts = functions.https.onRequest(
  (request, response) => {
    cors(request, response, async () => {
      const verified = await header_verification.isAuthenticated(request);
      if (!verified) {
        response.status(403).send('Unauthorized! Missing auth token');
        return;
      }
      const {bank_id, account_id, limit, starting_after, status} = request.body;
      console.log(
        'BANK ID =>',
        bank_id,
        account_id,
        limit,
        starting_after,
        status,
      );
      try {
        if (bank_id) {
          const payouts = await stripe.payouts.list(
            {
              status: status,
              limit: limit,
              destination: bank_id,
              starting_after: starting_after,
            },
            {
              stripe_account: account_id,
            },
          );
          response.status(200).send(payouts);
        } else {
          const payouts = await stripe.payouts.list(
            {
              status: status,
              limit: limit,
              starting_after: starting_after,
            },
            {
              stripe_account: account_id,
            },
          );
          response.status(200).send(payouts);
        }
      } catch (error) {
        console.error('ERROR LISTING PAYOUTS', error);
        response.status(500).send(error);
      }
    });
  },
);

exports.stripeListUserTransfers = functions.https.onRequest(
  (request, response) => {
    cors(request, response, async () => {
      const {account_id} = request.body;
      try {
        const payouts = await stripe.transfers.list({
          limit: '20',
          destination: account_id,
        });
        response.status(200).send(payouts);
      } catch (error) {
        console.error('ERROR LISTING PAYOUTS', error);
        response.status(500).send(error);
      }
    });
  },
);

exports.stripeRetrieveUserBalance = functions.https.onRequest(
  (request, response) => {
    cors(request, response, async () => {
      const verified = await header_verification.isAuthenticated(request);
      if (!verified) {
        response.status(403).send('Unauthorized! Missing auth token');
        return;
      }
      const {account_id} = request.body;
      try {
        const payouts = await stripe.balance.retrieve({
          stripe_account: account_id,
        });
        response.status(200).send(payouts);
      } catch (error) {
        console.error('ERROR LISTING PAYOUTS', error);
        response.status(500).send(error);
      }
    });
  },
);
