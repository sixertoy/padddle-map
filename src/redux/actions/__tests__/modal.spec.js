import { EVENT_TYPES } from '../../../constants';
import {
  closeModal,
  openDeleteModal,
  openLoginModal,
  openShareModal,
} from '../modal';

describe('src | redux | actions', () => {
  describe('modal', () => {
    describe('closeModal', () => {
      it('should dispatch close modal', () => {
        const expected = { type: EVENT_TYPES.MODAL_CLOSE };
        expect(closeModal()).toEqual(expected);
      });
    });

    describe('openDeleteModal', () => {
      it('should open delete modal', () => {
        const expected = { type: EVENT_TYPES.MODAL_DELETE_OPEN };
        expect(openDeleteModal()).toEqual(expected);
      });
    });

    describe('openLoginModal', () => {
      it('should open login modal', () => {
        const expected = { type: EVENT_TYPES.MODAL_LOGIN_OPEN };
        expect(openLoginModal()).toEqual(expected);
      });
    });

    describe('openShareModal', () => {
      it('should open share modal', () => {
        const expected = { type: EVENT_TYPES.MODAL_SHARE_OPEN };
        expect(openShareModal()).toEqual(expected);
      });
    });
  });
});
