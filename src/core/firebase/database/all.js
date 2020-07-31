import { getFirebaseApp } from '../core';

function all(path) {
  return new Promise((resolve, reject) => {
    const firebase = getFirebaseApp();
    firebase
      .database()
      .ref(path)
      .once('value')
      .then(dataSnapshot => {
        const values = dataSnapshot.val() || {};
        const results = Object.entries(values).map(arr => arr[1]);
        resolve(results);
      })
      .catch(reject);
  });
}

export default all;
