export const KEY_CODE_ENTER = 13;
export const IS_OWNER = process.env.REACT_APP_IS_OWNER === '1';
export const DEBUG_MODE = process.env.REACT_APP_DEBUG_MODE === '1';
export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';
export const PERSIST_STORAGE_KEY = 'supsuppad::';
export const ZINDEX = {
  LOADER: 9999999,
  MAP: 990,
  MAP_CONTROLS: 995,
  MODAL: 999999,
  PICKER: 9999999,
  POPUP: 99999,
  SIDEBAR: 9999,
};

export const FIREBASE_AUTH_LOCAL = 'local';
export const FIREBASE_AUTH_SESSION = 'session';
export const FIREBASE_EMAIL_SIGNIN_FALLBACK = 'https://typpo.space';

export const FIREBASE_PROVIDER_ANON = 'anonymous';
export const FIREBASE_PROVIDER_GITHUB = 'github.com';
export const FIREBASE_PROVIDER_GOOGLE = 'google.com';
export const FIREBASE_PROVIDER_FACEBOOK = 'facebook.com';

export const FRANCE_CENTER = [46.71109, 1.7191036];

export const EVENT_TYPES = {
  APP_LOADED: 'onAppLoaded',
  APP_LOADING: 'onAppLoading',
  DRAFT_ADD_POINT: 'onDraftAddPoint',
  DRAFT_CANCEL: 'onDraftCancel',
  DRAFT_COMMIT: 'onDraftCommit',
  DRAFT_CREATE: 'onDraftCreate',
  DRAFT_UPDATE: 'onDraftUpdate',
  EDIT_DISABLED: 'onEditDisabled',
  EDIT_ENABLED: 'onEditEnabled',
  MODAL_ACCOUNT_CLOSE: 'onShareAccountClose',
  MODAL_ACCOUNT_OPEN: 'onShareAccountOpen',
  MODAL_DELETE_CLOSE: 'onDeleteModalClose',
  MODAL_DELETE_OPEN: 'onDeleteModalOpen',
  MODAL_LOGIN_CLOSE: 'onLoginModalClose',
  MODAL_LOGIN_OPEN: 'onLoginModalOpen',
  MODAL_SHARE_CLOSE: 'onShareModalClose',
  MODAL_SHARE_OPEN: 'onShareModalOpen',
  PARCOURS_DELETE: 'onParcoursDelete',
  PARCOURS_IMPORTED: 'onParcoursImported',
  PARCOURS_LOADED: 'onParcoursLoaded',
  PARCOURS_UPDATE: 'onParcoursUpdate',
  SELECTED_CLOSE: 'onPopupClose',
  SELECTED_OPEN: 'onPopupOpen',
  SET_USER_POSITION: 'onSetUserPosition',
  USER_LOGIN: 'onUserLogin',
  USER_LOGOUT: 'onUserLogout',
};
