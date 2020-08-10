import omit from 'lodash.omit';
import pick from 'lodash.pick';

import { EVENT_TYPES } from '../../constants';
import { getDistance } from '../../core';
import { db } from '../../core/firebase';

const checkParcoursExists = (id, parcours) => {
  return parcours.find(obj => obj.id === id);
};

const importParcours = json => (dispatch, getState) => {
  dispatch({ type: EVENT_TYPES.APP_LOADING });
  const { parcours: currents } = getState();
  const { parcours } = JSON.parse(json);
  const items = Object.entries(parcours)
    .map(arr => {
      const value = arr[1];
      const item = omit(value, ['mtime', 'distance', 'coordinates']);
      const { id, points, polygon } = pick(item, ['id', 'points', 'polygon']);
      const exists = checkParcoursExists(id, currents);
      if (exists) return null;
      const mtime = Date.now();
      const [coordinates] = points;
      const distance = getDistance(points, polygon);
      return { ...item, coordinates, distance, mtime, points };
    })
    .filter(v => v);
  const promises = items.map(data => {
    return db.create(data.id, 'parcours', data);
  });
  Promise.all(promises).then(() => {
    dispatch({ items, type: EVENT_TYPES.PARCOURS_IMPORTED });
  });
};

export default importParcours;
