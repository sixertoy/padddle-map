import { getName } from 'ikea-name-generator';
import { v1 as uuidv1 } from 'uuid';

import { EVENT_TYPES } from '../../constants';
import { ucFirst } from '../../core';

const getDistance = points => {
  const distance = points
    .reduce((acc, latlng, index, list) => {
      const prev = list[index - 1] || latlng;
      const next = latlng.distanceTo(prev);
      return [...acc, next];
    }, [])
    .reduce((acc, value) => acc + value, 0);
  return distance;
};

const commitParcours = points => {
  console.log('commitParcours', points);
  const id = uuidv1();
  const name = ucFirst(getName());
  const polygon = points.length > 2;
  const distance = getDistance(points);
  const data = { distance, id, name, points, polygon };
  return { data, type: EVENT_TYPES.PARCOURS_COMMIT };
};

export default commitParcours;
