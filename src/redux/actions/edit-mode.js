import { EVENT_TYPES } from '../../constants';

export const enableEditMode = () => ({ type: EVENT_TYPES.EDIT_ENABLED });

export const disableEditMode = () => ({ type: EVENT_TYPES.EDIT_DISABLED });
