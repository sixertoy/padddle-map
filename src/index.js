import 'leaflet-geometryutil';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/dist/svg-arrow.css';
import 'tippy.js/animations/shift-away-subtle.css';
import './css/index.scss';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/analytics';
import 'firebase/firestore';

import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import firebase from 'firebase/app';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import { version } from '../package.json';
import App from './application';
import { FACEBOOK_APP_ID, FIREBASE_AUTH_LOCAL } from './constants';
import { FacebookProvider } from './core/facebook';
import { FirebaseAuthProvider } from './core/firebase';
import { loginUser, logoutUser } from './redux/actions';
import { getInitialState } from './redux/initial-state';
import { configure } from './redux/store';
import * as serviceWorker from './serviceWorker';

const { PUBLIC_URL } = process.env;
const initialState = getInitialState();
const { persistor, store } = configure(initialState);

Sentry.init({
  dsn:
    'https://90baa5882f004a7baacbac7e774dd03b@o398041.ingest.sentry.io/5410620',
  integrations: [new Integrations.BrowserTracing()],
  release: `padddle.io#${version}`,
  tracesSampleRate: 1.0, // Be sure to lower this in production
});
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
          onLogin={user => store.dispatch(loginUser(user))}
          onLogout={() => store.dispatch(logoutUser())}>
          <FacebookProvider appId={FACEBOOK_APP_ID}>
            <HashRouter basename={PUBLIC_URL}>
              <Sentry.ErrorBoundary>
                <App />
              </Sentry.ErrorBoundary>
            </HashRouter>
          </FacebookProvider>
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
