const functions = require('firebase-functions');
const cors = require('cors')({origin: true});
const stripe = require('stripe')(functions.config().stripe.keys.secret_key);
const header_verification = require('../header_verification');
const demoStripeAccount = require('../demo_data/stripe_demo_account.json');
const demoStripeCard = require('../demo_data/stripe_demo_card.json');

exports.stripeGetAccount = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    const {account_id, role} = request.body;
    if (role === 'demo') {
      response.status(200).send(demoStripeAccount);
    }
    if (account_id) {
      stripe.accounts.retrieve(account_id, (err, account) => {
        console.log(account);
        if (err) {
          response.status(500).send(err);
        } else {
          response.status(200).send(account);
        }
      });
    } else {
      response.status(400).send('Account Id Not Provided');
    }
  });
});

exports.stripeUpdateAccount = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    const verified = await header_verification.isAuthenticated(request);
    if (!verified) {
      response.status(403).send('Unauthorized! Missing auth token');
      return;
    }
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
    cors(request, response, async () => {
      const verified = await header_verification.isAuthenticated(request);
      if (!verified) {
        response.status(403).send('Unauthorized! Missing auth token');
        return;
      }
      const {account_id, updates} = request.body;
      if (account_id) {
        let newUpdates = {...updates};
        if (!updates.business_type) {
          console.warn('BUSINESS TYPE NOT SELECTED');
          newUpdates = {
            ...updates,
            business_type: 'individual',
            business_profile: {
              product_description:
                'A platform that allows home and business owners to rent out their unused parking spaces.',
            },
          };
        }
        console.log('NEW UPDATES =>', newUpdates);
        stripe.accounts.update(
          account_id,
          {
            ...newUpdates,
            tos_acceptance: {
              date: Math.floor(Date.now() / 1000),
              ip: request.connection.remoteAddress,
            },
          },
          (err, account) => {
            console.log(account);
            if (err) {
              console.error(err);
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

exports.stripeDeleteExternalAccount = functions.https.onRequest(
  (request, response) => {
    cors(request, response, async () => {
      const {account_id, bankToken} = request.body;
      console.log('bank token => ', bankToken);
      try {
        const deleted = await stripe.accounts.deleteExternalAccount(
          account_id,
          bankToken.tokenId,
        );
        if (deleted.deleted) {
          response.status(200).send({
            success: true,
            id: deleted.id,
            object: deleted.object,
          });
        } else {
          response.status(500).send({
            success: false,
            id: null,
            object: null,
          });
        }
      } catch (error) {
        response.send(error);
      }
    });
  },
);

exports.stripeListCards = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    const {customer_id, role} = request.body;
    if (role === 'demo') {
      console.log('DEMO CARD', demoStripeCard);
      response.status(200).send(demoStripeCard);
      return;
    }

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
    return;
  });
});

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
