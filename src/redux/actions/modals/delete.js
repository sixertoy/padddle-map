import { EVENT_TYPES } from '../../../constants';

export const openDeleteModal = () => ({ type: EVENT_TYPES.MODAL_DELETE_OPEN });

export const closeDeleteModal = () => ({
  type: EVENT_TYPES.MODAL_DELETE_CLOSE,
});
