const functions = require('firebase-functions');
const cors = require('cors')({origin: true});
const stripe = require('stripe')(functions.config().stripe.test.secret_key);

exports.stripeGetAccount = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    const {account_id} = request.body;
    if (account_id) {
      stripe.accounts.retrieve(account_id, (err, account) => {
        console.log(account);
        if (err) {
          response.status(500).send(err);
        } else {
          response.send(account);
        }
      });
    } else {
      response.status(400).send('Account Id Not Provided');
    }
  });
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

exports.stripeUpdateAccountWithTOS = functions.https.onRequest(
  (request, response) => {
    cors(request, response, () => {
      const {account_id, updates} = request.body;
      if (account_id) {
        stripe.accounts.update(
          account_id,
          {
            ...updates,
            tos_acceptance: {
              date: Math.floor(Date.now() / 1000),
              ip: request.connection.remoteAddress,
            },
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
  },
);

exports.stripeCreateAccount = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    const {email, user_id} = request.body;
    console.log('body', request.body);
    stripe.accounts.create(
      {
        country: 'US',
        type: 'custom',
        business_type: 'individual',
        business_profile: {
          product_description:
            'A platform that allows home and business owners to rent out their unused parking spaces.',
        },
        email: email,
        requested_capabilities: ['transfers'],
        metadata: {
          user_id: user_id,
        },
      },
      (err, account) => {
        console.log(account);
        console.error(err);
        if (err) {
          response.status(500).send(err);
        } else {
          response.status(200).send(account);
        }
        return;
      },
    );
  });
});

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

exports.stripeCreateExternalAccount = functions.https.onRequest(
  (request, response) => {
    cors(request, response, () => {
      const {account_id, bankToken} = request.body;
      console.log('bank token => ', bankToken);
      stripe.accounts.createExternalAccount(
        account_id,
        {
          external_account: bankToken.tokenId,
        },
        (err, bank) => {
          // asynchronously called
          if (err) {
            console.error(err);
            response.status(402).send(err);
          }
          if (bank) {
            console.log('Created Bank External Account => ', bank);
            response.status(200).send(bank);
          }
        },
      );
    });
  },
);

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

//// NOTE: THE FOLLOWING FUNCTION (stripePayParkingCharge) FUNCTION REQUIRES THE USE OF FIRESTORE SO IT IS WRITTEN IN INDEX

// exports.stripePayParkingCharge = functions.https.onRequest(
//   (request, response) => {
//     cors(request, response, async () => {
//       const {amount, description, token, port, metadata} = request.body;
//       let destination_stripe_account;
//       let destination_amount = parseInt(parseInt(amount, 10) * 0.8, 10);
//       try {
//         const portOwner = await store
//           .collection('users')
//           .doc(port.owner_id)
//           .get()
//           .then(doc => {
//             if (!doc.exists) {
//               console.log('No such document!');
//             } else {
//               return doc.data();
//             }
//           })
//           .catch(err => {
//             console.log('Error getting document', err);
//           });
//         console.log('port owner', portOwner);
//         destination_stripe_account = portOwner.stripe_account_id;
//       } catch (err) {
//         response.status(400).send(err);
//       }

//       console.log(
//         'Payment Token: ',
//         token,
//         'Destination Stripe Account: ',
//         destination_stripe_account,
//       );

//       stripe.charges.create(
//         {
//           amount: amount,
//           currency: 'usd',
//           description: description,
//           metadata: metadata,
//           source: 'tok_visa', //replace with token when going live
//           transfer_data: {
//             destination: destination_stripe_account,
//             amount: destination_amount,
//           },
//         },
//         (err, charge) => {
//           if (err) {
//             console.error(err);
//             response.status(500).send(err);
//           } else {
//             console.log(charge);
//             response.status(200).send(charge);
//           }
//         },
//       );
//     });
//   },
// );

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
