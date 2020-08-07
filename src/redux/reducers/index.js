import { combineReducers } from 'redux';

import * as app from './app';
import * as parcours from './parcours';

function createRootReducer() {
  return combineReducers({ ...app, ...parcours });
}

export default createRootReducer;
