import { EVENT_TYPES } from '../../../constants';

const loginUser = user => {
  return { type: EVENT_TYPES.USER_LOGIN, user };
};

export default loginUser;
