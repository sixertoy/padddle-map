import { EVENT_TYPES } from '../../constants';

const setGeolocated = value => {
  return { type: EVENT_TYPES.SET_GEOLOCATED, value };
};

export default setGeolocated;
