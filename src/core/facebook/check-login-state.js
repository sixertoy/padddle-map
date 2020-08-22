import firebase from 'firebase/app';
import get from 'lodash.get';

function isUserEqual(userId, firebaseUser) {
  if (!firebaseUser) return false;
  const providerData = get(firebaseUser, 'providerData', null);
  const found = providerData.find(obj => {
    const uid = get(obj, 'uid', null);
    const providerId = get(obj, 'providerId', null);
    const useFacebook = providerId === 'facebook.com';
    return useFacebook && uid === userId;
  });
  return !!found;
}

const checkLoginState = (response, onUserLogged) => {
  const userId = get(response, 'userID', null);
  if (userId) {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      unsubscribe();
      if (!isUserEqual(userId, user)) {
        const accessToken = get(response, 'accessToken', null);
        const credChecker = firebase.auth.FacebookAuthProvider.credential;
        const credential = credChecker(accessToken);
        firebase
          .auth()
          .signInWithCredential(credential)
          // .catch(() => {
          // Handle Errors here.
          // const errorCode = error.code;
          // const errorMessage = error.message;
          // The email of the user's account used.
          // const { email } = error;
          // The firebase.auth.AuthCredential type that was used.
          // const { credential } = error;
          // })
          .finally(() => {
            if (onUserLogged) onUserLogged();
          });
      }
    });
  } else {
    firebase.auth().signOut();
  }
};

export default checkLoginState;
