import { EVENT_TYPES } from '../../constants';

export const modal = (state = null, action) => {
  switch (action.type) {
    case EVENT_TYPES.MODAL_SHARE_OPEN:
      return 'share';
    case EVENT_TYPES.MODAL_LOGIN_OPEN:
      return 'login';
    case EVENT_TYPES.MODAL_SHARE_CLOSE:
    case EVENT_TYPES.MODAL_LOGIN_CLOSE:
      return false;
    default:
      return state;
  }
};

export const selected = (state = null, action) => {
  switch (action.type) {
    case EVENT_TYPES.POPUP_OPEN:
      return action.data;
    case EVENT_TYPES.POPUP_CLOSE:
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
