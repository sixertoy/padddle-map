import { getFirebaseApp } from '../core';

function remove(id, path) {
  return new Promise((resolve, reject) => {
    const firebase = getFirebaseApp();
    firebase
      .database()
      .ref(`${path}/${id}`)
      .remove()
      .then(() => resolve(id))
      .catch(reject);
  });
}

export default remove;
