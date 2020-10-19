async function getUserByUid(uid, store) {
  await store
    .collection('users')
    .doc(uid)
    .get();
}

module.exports.getUserByUid = getUserByUid;
