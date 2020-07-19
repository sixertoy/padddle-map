import { combineReducers } from 'redux';

import * as app from './app';

function createRootReducer() {
  return combineReducers({ ...app });
}

export default createRootReducer;
