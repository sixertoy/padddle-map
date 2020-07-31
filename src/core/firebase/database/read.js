import { getFirebaseApp } from '../core';

function read(id, path) {
  return new Promise(resolve => {
    const firebase = getFirebaseApp();
    const data = firebase.database().ref(`${path}/${id}`);
    data.on('value', snapshot => {
      resolve(snapshot.val());
    });
  });
}

export default read;
