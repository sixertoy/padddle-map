import { combineReducers } from 'redux';

import * as app from './app';
import * as parcours from './parcours';
import user from './user';

function createRootReducer() {
  return combineReducers({ ...app, ...parcours, user });
}

export default createRootReducer;
