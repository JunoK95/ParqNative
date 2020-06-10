const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});
const stripe = require('stripe')(functions.config().stripe.test.secret_key); //change to live

exports.stripeUpdateAccount2 = functions.https.onCall((data, context) => {
  const {account_id, updates} = data;
});

exports.stripeUpdateAccount = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    const {account_id, updates} = request.body;
    if (account_id) {
      stripe.accounts.update(
        account_id,
        {
          ...updates,
        },
        (err, account) => {
          console.log(account);
          if (err) {
            response.status(500).send(err);
          } else {
            response.send(account);
          }
        },
      );
    } else {
      response.status(400).send('Account Id Not Provided');
    }
  });
});