import { EVENT_TYPES } from '../../constants';

export const enableEditMode = () => ({ type: EVENT_TYPES.EDIT_ENABLED });
export const disableEditMode = () => ({ type: EVENT_TYPES.EDIT_DISABLED });

export const appLoaded = () => ({ type: EVENT_TYPES.APP_LOADED });
export const appLoading = () => ({ type: EVENT_TYPES.APP_LOADING });

export const closeSelected = () => ({ type: EVENT_TYPES.SELECTED_CLOSE });
export const openSelected = id => ({ id, type: EVENT_TYPES.SELECTED_OPEN });

export const geolocateUser = point => ({
  point,
  type: EVENT_TYPES.SET_USER_POSITION,
});
