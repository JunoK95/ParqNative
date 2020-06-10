const admin = require('firebase-admin');

async function isAuthenticated(req) {
  let requestedUid = req.body.uid;
  let authToken = validateHeader(req);
  if (!authToken) {
    return false;
  }
  let currentUid = await decodeAuthToken(authToken);

  return currentUid === requestedUid;
}

//helper to validate header is present
function validateHeader(req) {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    console.log('Auth Header Found');
    return req.headers.authorization.split('Bearer ')[1];
  }
}

//helper to decode token to firebase UID
async function decodeAuthToken(authToken) {
  const decodedToken = await admin.auth().verifyIdToken(authToken);
  return decodedToken.uid;
}

module.exports.isAuthenticated = isAuthenticated;
