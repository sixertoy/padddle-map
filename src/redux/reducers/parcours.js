import { EVENT_TYPES } from '../../constants';

export const selected = (state = null, action) => {
  switch (action.type) {
    case EVENT_TYPES.DRAFT_COMMIT:
    case EVENT_TYPES.DRAFT_CREATE:
      return action.data.id;
    case EVENT_TYPES.SELECTED_OPEN:
      return action.id;
    case EVENT_TYPES.DRAFT_CANCEL:
    case EVENT_TYPES.PARCOURS_DELETE:
    case EVENT_TYPES.SELECTED_CLOSE:
      return false;
    default:
      return state;
  }
};

export const editmode = (state = false, action) => {
  switch (action.type) {
    case EVENT_TYPES.DRAFT_COMMIT:
    case EVENT_TYPES.EDIT_ENABLED:
      return true;
    case EVENT_TYPES.USER_LOGOUT:
    case EVENT_TYPES.DRAFT_CANCEL:
    case EVENT_TYPES.EDIT_DISABLED:
    case EVENT_TYPES.SELECTED_OPEN:
    case EVENT_TYPES.SELECTED_CLOSE:
    case EVENT_TYPES.PARCOURS_DELETE:
      return false;
    default:
      return state;
  }
};

export const createmode = (state = false, action) => {
  switch (action.type) {
    case EVENT_TYPES.DRAFT_CREATE:
      return true;
    case EVENT_TYPES.DRAFT_COMMIT:
    case EVENT_TYPES.DRAFT_CANCEL:
    case EVENT_TYPES.PARCOURS_DELETE:
      return false;
    default:
      return state;
  }
};

export const draft = (state = false, action) => {
  switch (action.type) {
    case EVENT_TYPES.DRAFT_CANCEL:
    case EVENT_TYPES.DRAFT_COMMIT:
      return false;
    case EVENT_TYPES.DRAFT_CREATE:
      return { ...action.data };
    case EVENT_TYPES.DRAFT_UPDATE:
      return { ...state, ...action.data };
    case EVENT_TYPES.DRAFT_ADD_POINT:
      return { ...state, points: [...(state.points || []), action.latlng] };
    default:
      return state;
  }
};

export const parcours = (state = [], action) => {
  switch (action.type) {
    case EVENT_TYPES.DRAFT_COMMIT:
      return [...state, action.data];
    case EVENT_TYPES.PARCOURS_IMPORTED:
      return [...state, ...action.items];
    case EVENT_TYPES.PARCOURS_LOADED:
      return action.results;
    case EVENT_TYPES.PARCOURS_DELETE:
      return state.filter(obj => obj.id !== action.id);
    case EVENT_TYPES.PARCOURS_UPDATE:
      return state.map(obj => {
        const iscurrent = obj.id === action.data.id;
        if (!iscurrent) return obj;
        return { ...obj, ...action.data };
      });
    default:
      return state;
  }
};
