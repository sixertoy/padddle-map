import { EVENT_TYPES } from '../../constants';

const setUserPosition = point => {
  return { point, type: EVENT_TYPES.SET_USER_POSITION };
};

export default setUserPosition;
