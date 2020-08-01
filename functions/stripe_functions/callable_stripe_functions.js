const functions = require('firebase-functions');
const cors = require('cors')({origin: true});
const stripe = require('stripe')(functions.config().stripe.live.secret_key); //change to live

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