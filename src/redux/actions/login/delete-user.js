import { EVENT_TYPES } from '../../../constants';

const deleteUser = () => {
  return { type: EVENT_TYPES.USER_DELETE };
};

export default deleteUser;
