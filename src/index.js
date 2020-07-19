import 'tippy.js/dist/tippy.css';
import 'tippy.js/dist/svg-arrow.css';
import 'tippy.js/animations/shift-away-subtle.css';
import './css/index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { version } from '../package.json';
import App from './application';
import { getInitialState } from './redux/initial-state';
import { configure } from './redux/store';

const initialState = getInitialState();
const { persistor, store } = configure(initialState);

// eslint-disable-next-line
console.log('Version : v', version);

ReactDOM.render(
  // eslint-disable-next-line
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
