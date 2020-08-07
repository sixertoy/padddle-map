import get from 'lodash.get';

import { EVENT_TYPES } from '../../../constants';
import { distanceCalculation } from '../../../core';
import { db } from '../../../core/firebase';

const updateParcours = data => dispatch => {
  const mtime = Date.now();
  const id = get(data, 'id', null);
  const [coordinates] = data.points;
  const distance = distanceCalculation(data.points);
  const next = { ...data, coordinates, distance, mtime };
  return db.update(id, 'parcours', next).then(() => {
    dispatch({ data: next, type: EVENT_TYPES.PARCOURS_UPDATE });
  });
};

export default updateParcours;
