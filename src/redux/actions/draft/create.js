import { getName } from 'ikea-name-generator';
import { v1 as uuidv1 } from 'uuid';

import { EVENT_TYPES } from '../../../constants';
import { ucFirst } from '../../../core';

const createDraft = () => (dispatch, getState) => {
  const points = [];
  const id = uuidv1();
  const polygon = false;
  const color = '#800082';
  const { user } = getState();
  const name = ucFirst(getName());
  dispatch({
    data: {
      color,
      id,
      name,
      points,
      polygon,
      user,
    },
    type: EVENT_TYPES.DRAFT_CREATE,
  });
};

export default createDraft;
