import get from 'lodash.get';

import { EVENT_TYPES } from '../../../constants';
import { getDistance } from '../../../core';
import { db } from '../../../core/firebase';
import { getPathPoints } from '../../../helpers';

const updateParcours = data => dispatch => {
  const mtime = Date.now();
  const id = get(data, 'id', null);
  const flattend = getPathPoints(data.points);
  // if (data.polygon) {
  //   const endpoint = getPolygonEndPoint(flattend);
  //   flattend = [...flattend, endpoint];
  // }
  const [coordinates] = flattend;
  const distance = getDistance(flattend);
  const next = { ...data, coordinates, distance, mtime, points: flattend };
  return db.update(id, 'parcours', next).then(() => {
    dispatch({ data: next, type: EVENT_TYPES.PARCOURS_UPDATE });
  });
};

export default updateParcours;
