import { EVENT_TYPES } from '../../constants';

export const editmode = (state = false, action) => {
  switch (action.type) {
    case EVENT_TYPES.PARCOURS_CREATE:
      return true;
    case EVENT_TYPES.PARCOURS_COMMIT:
      return false;
    default:
      return state;
  }
};

export const draft = (state = [], action) => {
  switch (action.type) {
    case EVENT_TYPES.PARCOURS_CREATE:
    case EVENT_TYPES.PARCOURS_COMMIT:
      return [];
    case EVENT_TYPES.PARCOURS_UPDATE:
      return [...state, action.data.point];
    default:
      return state;
  }
};

export const parcours = (state = [], action) => {
  switch (action.type) {
    case EVENT_TYPES.PARCOURS_DELETE:
      return state.filter(obj => obj.id !== action.id);
    case EVENT_TYPES.PARCOURS_COMMIT:
      return [...state, action.data];
    default:
      return state;
  }
};
