import { EVENT_TYPES } from '../../../constants';

const updateUser = ({ user }) => {
  return { type: EVENT_TYPES.USER_UPDATE, user };
};

export default updateUser;
