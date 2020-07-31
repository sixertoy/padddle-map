import { combineReducers } from 'redux';

import * as app from './app';
import * as user from './user';

function createRootReducer() {
  return combineReducers({ ...app, user });
}

export default createRootReducer;
