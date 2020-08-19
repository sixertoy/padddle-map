import storage from 'redux-persist/lib/storage';

import { PERSIST_STORAGE_KEY } from '../constants';

const INITIAL_REDUCERS = {
  blacklist: {
    createmode: false,
    draft: false,
    editmode: false,
    loading: true,
    modal: false,
    parcours: [],
    parcoursLoaded: false,
    selected: false,
    user: null,
    userposition: false,
  },
  whitelist: {},
};

export const reduxPersistConfig = {
  blacklist: Object.keys(INITIAL_REDUCERS.blacklist),
  key: PERSIST_STORAGE_KEY,
  storage,
  whitelist: Object.keys(INITIAL_REDUCERS.whitelist),
};

export const getInitialState = () => {
  const { blacklist, whitelist } = INITIAL_REDUCERS;
  const values = { ...whitelist, ...blacklist };
  const initialState = { ...values };
  return initialState;
};
