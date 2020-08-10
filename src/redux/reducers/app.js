import { EVENT_TYPES } from '../../constants';

export const modal = (state = null, action) => {
  switch (action.type) {
    case EVENT_TYPES.MODAL_SHARE_OPEN:
      return 'share';
    case EVENT_TYPES.MODAL_LOGIN_OPEN:
      return 'login';
    case EVENT_TYPES.MODAL_DELETE_OPEN:
      return 'delete';
    case EVENT_TYPES.MODAL_SHARE_CLOSE:
    case EVENT_TYPES.MODAL_LOGIN_CLOSE:
    case EVENT_TYPES.MODAL_DELETE_CLOSE:
      return false;
    default:
      return state;
  }
};

export const loading = (state = true, action) => {
  switch (action.type) {
    case EVENT_TYPES.APP_LOADING:
      return true;
    case EVENT_TYPES.APP_LOADED:
    case EVENT_TYPES.PARCOURS_LOADED:
    case EVENT_TYPES.PARCOURS_IMPORTED:
      return false;
    default:
      return state;
  }
};

export const userposition = (state = null, action) => {
  switch (action.type) {
    case EVENT_TYPES.SET_USER_POSITION:
      return action.point;
    default:
      return state;
  }
};
