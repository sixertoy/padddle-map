import 'tippy.js/dist/tippy.css';
import 'tippy.js/dist/svg-arrow.css';
import 'tippy.js/animations/shift-away-subtle.css';
import './css/index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import { version } from '../package.json';
import App from './application';
import { getInitialState } from './redux/initial-state';
import { configure } from './redux/store';

const { PUBLIC_URL } = process.env;
const initialState = getInitialState();
const { persistor, store } = configure(initialState);

// eslint-disable-next-line
console.log('Version : v', version);

ReactDOM.render(
  // eslint-disable-next-line
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HashRouter basename={PUBLIC_URL}>
          <App />
        </HashRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
