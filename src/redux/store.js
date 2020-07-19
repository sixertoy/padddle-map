import { applyMiddleware, createStore } from 'redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer, persistStore, purgeStoredState } from 'redux-persist';
import thunk from 'redux-thunk';

import { reduxPersistConfig } from './initial-state';
import createRootReducer from './reducers';

function debugStored() {}

function bindMiddleware(middleware = []) {
  const appliedMiddlewares = applyMiddleware(...middleware);
  // NOTE utiliser nappr-core/Logger
  // if (isDevelopment()) {
  const composeEnhancers = composeWithDevTools({});
  return composeEnhancers(appliedMiddlewares);
  // }
  // return appliedMiddlewares;
}

export const clearPersistentStorage = () =>
  // https://git.io/v9hbh
  purgeStoredState({}, reduxPersistConfig.whitelist)
    .then(() => {
      // console.log('purged of whitelist success')
    })
    .catch(() => {
      // console.log('purge of someReducer failed')
    });

export const configure = (initialState = {}) => {
  const rootReducer = createRootReducer();
  const persistedReducer = persistReducer(reduxPersistConfig, rootReducer);
  const store = createStore(
    persistedReducer,
    initialState,
    bindMiddleware([thunk])
  );
  const persistor = persistStore(store, null, () => debugStored());
  return { persistor, store };
};
