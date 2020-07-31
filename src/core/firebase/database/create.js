import { getFirebaseApp } from '../core';

function create(id, path, values) {
  return new Promise((resolve, reject) => {
    const firebase = getFirebaseApp();
    firebase
      .database()
      .ref(`${path}/${id}`)
      .set(values, error => {
        if (error) {
          reject(error);
        } else {
          resolve(id);
        }
      });
  });
}

export default create;
