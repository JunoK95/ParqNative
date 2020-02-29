const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});
const stripe = require('stripe')(functions.config().stripe.testkey);

admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.stripeCreateNewCustomer = functions.https.onRequest(
  (request, response) => {
    cors(request, response, () => {
      const {email, name, user_id} = request.body;
      stripe.customers.create(
        {
          email: email,
          name: name,
          metadata: {
            user_id: user_id,
          },
        },
        (err, customer) => {
          console.log(customer);
          console.error(err);
          if (err) {
            response.status(500).send(err);
          } else {
            response.send(customer);
          }
          return;
        },
      );
    });
  },
);

//This operation is not recommended and requires SAQ D.  Use client tokenization instead (look into stripejs or stripe elements)
exports.stripeCreateCardToken = functions.https.onRequest(
  (request, response) => {
    cors(request, response, () => {
      const {number, exp_month, exp_year, cvc} = request.body;
      console.log('creating Card Token with => ', request.body);
      stripe.tokens.create(
        {
          card: {
            number: number,
            exp_month: exp_month,
            exp_year: exp_year,
            cvc: cvc,
          },
        },
        (err, token) => {
          // asynchronously called
          if (err) {
            console.error(err);
            response.status(500).send('error retrieving card info');
            return err;
          } else {
            console.log('card token =>', token);
            response.status(200).send(token);
            return token;
          }
        },
      );
    });
  },
);

exports.stripeCreateCard = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    const {customer_id, cardToken} = request.body;
    console.log('card token => ', cardToken);
    stripe.customers.createSource(
      customer_id,
      {source: cardToken},
      (err, card) => {
        // asynchronously called
        if (err) {
          console.error(err);
          response.status(402).send(err);
        }
        if (card) {
          console.log('created source => ', card);
          response.status(200).send(card);
        }
      },
    );
  });
});

exports.stripeCheckoutSession = functions.https.onRequest(
  (request, response) => {
    cors(request, response, () => {
      const {price} = request.body;
      stripe.checkout.sessions.create(
        {
          success_url: 'https://parq.tech/payment/success',
          cancel_url: 'https://parq.tech/payment/cancel',
          payment_method_types: ['card'],
          line_items: [
            {
              name: 'T-shirt',
              description: 'Comfortable cotton t-shirt',
              amount: 1500,
              currency: 'usd',
              quantity: 2,
            },
          ],
        },
        (err, session) => {
          // asynchronously called
          console.error(err);
          console.log(session);
          response.send(session);
        },
      );
    });
  },
);

//Use if user does not have a stripe customer.id
exports.stripeFirstPurchase = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    const {email} = request.body;
  });
});

exports.stripeListCards = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    const {customer_id} = request.body;
    const options = {
      object: 'card',
      limit: 10,
    };
    stripe.customers.listSources(customer_id, options, (err, cards) => {
      if (err) {
        console.error(err);
        response.status(500).send(err);
      } else {
        console.log(cards);
        response.status(200).send(cards);
      }
    });
  });
});

exports.stripeElementPaymentIntent = functions.https.onRequest(
  (request, response) => {
    cors(request, response, () => {
      const {amount} = request.body;
      stripe.paymentIntents.create(
        {
          amount: amount,
          currency: 'usd',
        },
        (err, paymentIntent) => {
          if (err) {
            console.error(err);
            response.status(500).send(err);
          } else {
            console.log(paymentIntent);
            response.status(200).send(paymentIntent);
          }
        },
      );
    });
  },
);

exports.stripeElementCharge = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    const {amount, description, token} = request.body;
    console.log(token);
    stripe.charges.create(
      {
        amount: amount,
        currency: 'usd',
        description: description,
        source: 'tok_visa', //replace with token when going live
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
});

exports.walletAddBalance = functions.firestore
  .document('purchases/{purchaseId}')
  .onCreate((snap, context) => {
    const data = snap.data();
    const {user_id, amount} = data;

    console.log(data);
    if (data.type === 'add_credit') {
      const wallet = db
        .doc(`wallets/${user_id}`)
        .update({
          credit: admin.firestore.FieldValue.increment(amount),
        })
        .then(res => {
          return res;
        })
        .catch(err => {
          return err;
        });
      return true;
    }
    return true;
  });
