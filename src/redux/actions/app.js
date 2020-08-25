import { EVENT_TYPES } from '../../constants';

export const closeDemoMode = () => ({ type: EVENT_TYPES.DEMO_UPDATED });

export const enableDebugMode = () => ({ type: EVENT_TYPES.DEBUG_ENABLED });
export const disableDebugMode = () => ({ type: EVENT_TYPES.DEBUG_DISABLED });

export const enableEditMode = () => ({ type: EVENT_TYPES.EDIT_ENABLED });
export const disableEditMode = () => ({ type: EVENT_TYPES.EDIT_DISABLED });

export const closeSelected = () => ({ type: EVENT_TYPES.SELECTED_CLOSE });
export const openSelected = id => ({ id, type: EVENT_TYPES.SELECTED_OPEN });

export const updateAppReadyState = data => ({
  data,
  type: EVENT_TYPES.APP_READY_STATE_UPDATE,
});

export const geolocateUser = point => ({
  point,
  type: EVENT_TYPES.SET_USER_POSITION,
});
