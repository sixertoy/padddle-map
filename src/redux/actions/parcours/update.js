import get from 'lodash.get';

import { EVENT_TYPES } from '../../../constants';
import { getDistance } from '../../../core';
import { db } from '../../../core/firebase';
import { getPathPoints } from '../../../helpers';

const updateParcours = data => dispatch => {
  const { points, polygon } = data;
  const mtime = Date.now();
  const id = get(data, 'id', null);
  const pts = getPathPoints(points);
  const [coordinates] = pts;
  const distance = getDistance(pts, polygon);
  const next = { ...data, coordinates, distance, mtime, points: pts };
  return db.update(id, 'parcours', next).then(() => {
    dispatch({ data: next, type: EVENT_TYPES.PARCOURS_UPDATE });
  });
};

export default updateParcours;
