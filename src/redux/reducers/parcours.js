import { EVENT_TYPES } from '../../constants';

export const draft = (state = false, action) => {
  switch (action.type) {
    case EVENT_TYPES.DRAFT_CREATE:
      return { ...action.data };
    case EVENT_TYPES.DRAFT_CANCEL:
    case EVENT_TYPES.DRAFT_COMMIT:
    case EVENT_TYPES.SELECTED_CLOSE:
      return false;
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
    case EVENT_TYPES.PARCOURS_IMPORTED:
      return [...state, ...action.items];
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
