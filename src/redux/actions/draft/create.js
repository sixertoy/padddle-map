import { getName } from 'ikea-name-generator';
import { v1 as uuidv1 } from 'uuid';

import { EVENT_TYPES } from '../../../constants';
import { ucFirst } from '../../../core';

const createDraft = uid => {
  const color = 0;
  const points = [];
  const id = uuidv1();
  const polygon = false;
  const name = ucFirst(getName());
  return {
    data: {
      color,
      id,
      name,
      points,
      polygon,
      user: uid,
    },
    type: EVENT_TYPES.DRAFT_CREATE,
  };
};

export default createDraft;
