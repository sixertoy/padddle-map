import { EVENT_TYPES } from '../../../constants';

const logoutUser = () => {
  return { type: EVENT_TYPES.USER_LOGOUT };
};

export default logoutUser;
