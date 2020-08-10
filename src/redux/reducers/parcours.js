import { EVENT_TYPES } from '../../constants';

export const editmode = (state = false, action) => {
  switch (action.type) {
    case EVENT_TYPES.EDIT_ENABLED:
      return true;
    case EVENT_TYPES.POPUP_OPEN:
    case EVENT_TYPES.POPUP_CLOSE:
    case EVENT_TYPES.EDIT_DISABLED:
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
    case EVENT_TYPES.DRAFT_CANCEL:
    case EVENT_TYPES.DRAFT_COMMIT:
      return false;
    default:
      return state;
  }
};

export const selected = (state = null, action) => {
  switch (action.type) {
    case EVENT_TYPES.POPUP_OPEN:
      return action.id;
    case EVENT_TYPES.POPUP_CLOSE:
      return false;
    default:
      return state;
  }
};

export const draft = (state = false, action) => {
  switch (action.type) {
    case EVENT_TYPES.DRAFT_CREATE:
      return { ...action.data };
    case EVENT_TYPES.DRAFT_CANCEL:
    case EVENT_TYPES.DRAFT_COMMIT:
      return false;
    case EVENT_TYPES.DRAFT_ADD_POINT:
      return { ...state, points: [...(state.points || []), action.latlng] };
    case EVENT_TYPES.DRAFT_UPDATE:
      return { ...state, ...action.data };
    default:
      return state;
  }
};

export const parcours = (state = [], action) => {
  switch (action.type) {
    case EVENT_TYPES.PARCOURS_LOADED:
      return action.results;
    case EVENT_TYPES.DRAFT_COMMIT:
      return [...state, action.data];
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
