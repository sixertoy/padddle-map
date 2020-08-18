import 'leaflet-geometryutil';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/dist/svg-arrow.css';
import 'tippy.js/animations/shift-away-subtle.css';
import './css/index.scss';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/analytics';
import 'firebase/firestore';

import firebase from 'firebase/app';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import { version } from '../package.json';
import App from './application';
import { FIREBASE_AUTH_LOCAL } from './constants';
import { FirebaseAuthProvider } from './core/firebase';
import { loginUser, logoutUser } from './redux/actions';
import { getInitialState } from './redux/initial-state';
import { configure } from './redux/store';
import * as serviceWorker from './serviceWorker';

const { PUBLIC_URL } = process.env;
const initialState = getInitialState();
const { persistor, store } = configure(initialState);

// eslint-disable-next-line
console.log(`Padddle App Version v${version}`);

ReactDOM.render(
  // eslint-disable-next-line
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <FirebaseAuthProvider
          firebase={firebase}
          persistence={FIREBASE_AUTH_LOCAL}
          onLogin={(user, token) => store.dispatch(loginUser(user, token))}
          onLogout={() => store.dispatch(logoutUser())}>
          <HashRouter basename={PUBLIC_URL}>
            <App />
          </HashRouter>
        </FirebaseAuthProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
