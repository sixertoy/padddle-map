import { EVENT_TYPES } from '../../constants';

const setPosition = latlng => {
  return { latlng, type: EVENT_TYPES.SET_USER_POSITION };
};

export default setPosition;
