import { EVENT_TYPES } from '../../constants';

export const prompted = (state = true, action) => {
  switch (action.type) {
    case EVENT_TYPES.INSTALL_PROMPTED:
      return true;
    default:
      return state;
  }
};

export const selected = (state = null, action) => {
  switch (action.type) {
    case EVENT_TYPES.SELECTED_OPEN:
      return action.id;
    case EVENT_TYPES.DRAFT_COMMIT:
    case EVENT_TYPES.PARCOURS_DELETE:
    case EVENT_TYPES.SELECTED_CLOSE:
      return false;
    default:
      return state;
  }
};

export const editmode = (state = false, action) => {
  switch (action.type) {
    case EVENT_TYPES.EDIT_ENABLED:
      return true;
    case EVENT_TYPES.PARCOURS_DELETE:
    case EVENT_TYPES.SELECTED_OPEN:
    case EVENT_TYPES.SELECTED_CLOSE:
    case EVENT_TYPES.EDIT_DISABLED:
      return false;
    default:
      return state;
  }
};

export const createmode = (state = false, action) => {
  switch (action.type) {
    case EVENT_TYPES.DRAFT_CREATE:
      return true;
    case EVENT_TYPES.PARCOURS_DELETE:
    case EVENT_TYPES.SELECTED_CLOSE:
    case EVENT_TYPES.DRAFT_CANCEL:
    case EVENT_TYPES.DRAFT_COMMIT:
      return false;
    default:
      return state;
  }
};

export const modal = (state = null, action) => {
  switch (action.type) {
    case EVENT_TYPES.MODAL_SHARE_OPEN:
      return 'share';
    case EVENT_TYPES.MODAL_LOGIN_OPEN:
      return 'login';
    case EVENT_TYPES.MODAL_DELETE_OPEN:
      return 'delete';
    case EVENT_TYPES.USER_LOGIN:
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
      return false;
    default:
      return state;
  }
};

export const parcoursLoaded = (state = false, action) => {
  switch (action.type) {
    case EVENT_TYPES.PARCOURS_LOADED:
      return true;
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

export const user = (state = null, action) => {
  switch (action.type) {
    case EVENT_TYPES.USER_LOGIN:
      return (action.user && action.user.uid) || null;
    case EVENT_TYPES.USER_LOGOUT:
      return null;
    default:
      return state;
  }
};

export const token = (state = null, action) => {
  switch (action.type) {
    case EVENT_TYPES.USER_LOGIN:
      return action.token || null;
    case EVENT_TYPES.USER_LOGOUT:
      return null;
    default:
      return state;
  }
};
