import { checkIsNotAppleDevice } from '../core';

const getGoogleMapsLink = ({ lat, lng }) => {
  const baseurl = 'maps.google.com/maps';
  const isAndroid = checkIsNotAppleDevice();
  const query = `q=${lat},${lng}&ll=${lat},${lng}&z=13`;
  const protocol = isAndroid ? 'geo' : 'https';
  const next = `${protocol}://${baseurl}?${query}`;
  return next;
};

export default getGoogleMapsLink;
