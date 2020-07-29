import { EVENT_TYPES } from '../../constants';

export const userposition = (state = null, action) => {
  switch (action.type) {
    case EVENT_TYPES.SET_USER_POSITION:
      return action.latlng;
    default:
      return state;
  }
};

export const editmode = (state = false, action) => {
  switch (action.type) {
    case EVENT_TYPES.DRAFT_CREATE:
      return true;
    case EVENT_TYPES.DRAFT_COMMIT:
      return false;
    default:
      return state;
  }
};

export const draft = (state = {}, action) => {
  switch (action.type) {
    case EVENT_TYPES.DRAFT_CREATE:
      return { ...action.data };
    case EVENT_TYPES.DRAFT_COMMIT:
      return {};
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
