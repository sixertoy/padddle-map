import get from 'lodash.get';
import isEmpty from 'lodash.isempty';

import { EVENT_TYPES } from '../../constants';
import hydrate from '../hydrate';

const model = {
  ctime: () => Date.now(),
  email: null,
  emailVerified: false,
  isAnonymous: true,
  mtime: () => Date.now(),
  name: user => get(user, 'displayName', null),
  parcours: [],
  photoURL: null,
  provider: user => get(user, 'providerData.0.providerId', null),
  uid: null,
};

const createUser = (state, action) => {
  const { user } = action;
  const next = hydrate(model, user);
  return next;
};

const createProject = state => {
  const mtime = Date.now();
  return { ...state, mtime, parcours: [] };
};

const updateUserTime = state => {
  const mtime = Date.now();
  return { ...state, mtime };
};

const user = (state = {}, action) => {
  let isempty = true;
  switch (action.type) {
    case EVENT_TYPES.USER_DELETE:
      return {};
    case EVENT_TYPES.USER_UPDATE:
      isempty = isEmpty(action.user);
      if (isempty) return state;
      return createUser(state, action);
    case EVENT_TYPES.PROJECT_CREATE:
      return createProject(state, action);
    case EVENT_TYPES.PROJECT_CLEAR:
      return updateUserTime(state);
    default:
      return state;
  }
};

export default user;
