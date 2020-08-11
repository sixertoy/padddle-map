import { EVENT_TYPES } from '../../constants';

export const loginUser = user => {
  return { type: EVENT_TYPES.USER_LOGIN, user };
};

export const logoutUser = () => {
  return { type: EVENT_TYPES.USER_LOGOUT };
};
