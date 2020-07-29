import { EVENT_TYPES } from '../../constants';

const setPosition = latlng => {
  return { latlng, type: EVENT_TYPES.SET_POSITION };
};

export default setPosition;
