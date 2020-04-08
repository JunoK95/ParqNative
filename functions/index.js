const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});
const stripe = require('stripe')(functions.config().stripe.testkey); //Change API Key On Launch

admin.initializeApp(functions.config().firebase);

const db = admin.firestore();
const webhookSig = functions.config().stripe.webhook.signing;
const webhookAccountSig = functions.config().stripe.webhook.account_signing;
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.stripeAccountEvents = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
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

    //Handle Account Webhooks
    switch (event.type) {
      case 'account.updated':
        console.log('ACCOUNT UPDATED => ', event);
        const {object} = event.data;
        if (object.tos_acceptance) {
          db.collection('wallets')
            .doc(object.metadata.user_id)
            .update({stripe_account_verified: true});
        }
        response.status(200).send(object);
        break;
      case 'account.external_account.created':
        console.log('BANK ACCOUNT ADDED => ', event);
        response.status(200).send(object);
        break;
      case 'account.external_account.deleted':
        console.log('BANK ACCOUNT DELETED => ', event);
        response.status(200).send(object);
        break;
      default:
        response.status(200).send(event);
        break;
    }
  });
});

exports.stripeEvents = functions.https.onRequest((request, response) => {
  let event;
  let sig = request.headers['stripe-signature'];
  try {
    event = stripe.webhooks.constructEvent(request.rawBody, sig, webhookSig);
    console.log('Webhook Event = ', event);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case 'charge.succeeded':
      console.log('CHARGE SUCCEEDED => ', event);
      break;
    case 'customer.sources.created':
      console.log('CUSTOMER SOURCES CREATED => ', event);
      break;
    case 'payment_method.attached':
      console.log('PAYMENT METHOD ATTACHED => ', event);
      break;
    case 'charge.refund.updated':
      console.log('CHARGE REFUNDED => ', event);
      break;
    default:
      break;
  }

  console.log('Stripe Event => ', event.type);
  response.status(200).end();
});

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

exports.stripeCreateBank = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    const {customer_id, bankToken} = request.body;
    console.log('card token => ', bankToken);
    stripe.customers.createSource(
      customer_id,
      {source: bankToken},
      (err, bank) => {
        // asynchronously called
        if (err) {
          console.error(err);
          response.status(402).send(err);
        }
        if (bank) {
          console.log('created source => ', bank);
          response.status(200).send(bank);
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

exports.stripeListBanks = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    const {customer_id} = request.body;
    const options = {
      object: 'bank_object',
      limit: 10,
    };
    stripe.customers.listSources(customer_id, options, (err, banks) => {
      if (err) {
        console.error(err);
        response.status(500).send(err);
      } else {
        console.log(banks);
        response.status(200).send(banks);
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

exports.stripePayParkingCharge = functions.https.onRequest(
  (request, response) => {
    cors(request, response, async () => {
      const {amount, description, token, port, metadata} = request.body;
      let destination_stripe_account;
      let destination_amount = parseInt(parseInt(amount, 10) * 0.8, 10);
      try {
        const portOwner = await db
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

exports.getUserContactInfo = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    const {user_id} = request.body;
    try {
      const userRef = db.collection('users').doc(user_id);
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

exports.userMetrics = functions.firestore
  .document('users/{user_id}')
  .onCreate((snap, context) => {
    const data = snap.data();

    db.doc('metrics/users').update({
      total_users: admin.firestore.FieldValue.increment(1),
    });

    db.doc(`user_metrics/${context.params.user_id}`).set({
      amount_refunded: 0,
      amount_spent: 0,
      hours_parked: 0,
      parking_purchases: 0,
    });

    return true;
  });

exports.reservationMetrics = functions.firestore
  .document('reservations/{reservationId}')
  .onCreate((snap, context) => {
    const data = snap.data();
    const {hours, price, user_id, carport_id, carport_data} = data;

    //update total reservations metrics
    db.doc('metrics/reservations').update({
      total_hours: admin.firestore.FieldValue.increment(parseInt(hours, 10)),
      total_reservations: admin.firestore.FieldValue.increment(1),
      gross_income: admin.firestore.FieldValue.increment(parseFloat(price)),
    });

    //update user metrics
    db.doc(`user_metrics/${user_id}`).set(
      {
        amount_refunded: admin.firestore.FieldValue.increment(0),
        amount_spent: admin.firestore.FieldValue.increment(parseFloat(price)),
        hours_parked: admin.firestore.FieldValue.increment(parseInt(hours, 10)),
        parking_purchases: admin.firestore.FieldValue.increment(1),
      },
      {merge: true},
    );

    //update carport metrics
    db.doc(`carport_metrics/${carport_id}`).set(
      {
        amount_refunded: admin.firestore.FieldValue.increment(0),
        amount_earned_gross: admin.firestore.FieldValue.increment(
          parseFloat(price),
        ),
        amount_earned_net: admin.firestore.FieldValue.increment(0),
        hours_parked: admin.firestore.FieldValue.increment(parseInt(hours, 10)),
        total_parking: admin.firestore.FieldValue.increment(1),
        owner_id: carport_data.owner_id,
      },
      {merge: true},
    );

    return true;
  });

exports.carportMetrics = functions.firestore
  .document('carports/{carportId}')
  .onCreate((snap, context) => {
    const data = snap.data();
    const {accomodations, type, available_spaces, owner_id} = data;
    const updateData = {
      accomodations: {
        compact_only:
          accomodations.compact_only && admin.firestore.FieldValue.increment(1),
        covered_space:
          accomodations.covered_space &&
          admin.firestore.FieldValue.increment(1),
        ev_charging:
          accomodations.ev_charging && admin.firestore.FieldValue.increment(1),
        low_clearance:
          accomodations.low_clearance &&
          admin.firestore.FieldValue.increment(1),
        no_reentry:
          accomodations.no_reentry && admin.firestore.FieldValue.increment(1),
        parallel:
          accomodations.parallel && admin.firestore.FieldValue.increment(1),
      },
      types: {
        driveway:
          type === 'driveway' && admin.firestore.FieldValue.increment(1),
        parkinglot:
          type === 'parkinglot' && admin.firestore.FieldValue.increment(1),
        garage: type === 'garage' && admin.firestore.FieldValue.increment(1),
        structure:
          type === 'structure' && admin.firestore.FieldValue.increment(1),
      },
      total_parking_spaces: admin.firestore.FieldValue.increment(
        parseInt(available_spaces, 10),
      ),
      total_carports: admin.firestore.FieldValue.increment(1),
    };

    db.doc(`carport_metrics/${context.params.carportId}`).set({
      amount_earned_gross: 0,
      amount_earned_net: 0,
      amount_refunded: 0,
      date_created: new Date(),
      hours_parked: 0,
      total_parking: 0,
      owner_id: owner_id,
    });

    db.doc('metrics/carports').update(updateData);

    return true;
  });
