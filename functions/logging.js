const functions = require('firebase-functions');
const cors = require('cors')({origin: true});

exports.sendLog = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    const {type, message, description} = request.body;
    switch (type) {
      case 'error':
        console.error(description, message);
        break;
      case 'warning':
        console.warn(description, message);
        break;
      default:
        console.log(description, message);
        break;
    }
    response.status(200).send('Logged');
  });
});
