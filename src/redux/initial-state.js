import storage from 'redux-persist/lib/storage';

import { PERSIST_STORAGE_KEY } from '../constants';

const INITIAL_REDUCERS = {
  blacklist: {
    appready: { map: false, tracks: false },
    createmode: false,
    debugmode: false,
    draft: false,
    editmode: false,
    loading: true,
    modal: false,
    parcours: [],
    selected: false,
    user: null,
    userposition: false,
  },
  whitelist: {
    demomode: { authed: true, unauthed: true },
  },
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
