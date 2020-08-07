import { getFirebaseApp } from '../core';

function update(id, path, values) {
  return new Promise((resolve, reject) => {
    const firebase = getFirebaseApp();
    firebase
      .database()
      .ref(`${path}/${id}`)
      .set(values, error => {
        if (error) reject(error);
        if (!error) resolve(id);
      });
  });
}

export default update;
