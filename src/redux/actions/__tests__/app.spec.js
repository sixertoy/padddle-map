import { EVENT_TYPES } from '../../../constants';
import {
  closeSelected,
  disableEditMode,
  enableEditMode,
  geolocateUser,
  openSelected,
  updateAppReadyState,
} from '../app';

describe('src | redux | actions', () => {
  describe('app', () => {
    describe('enableEditMode', () => {
      it('should dispatch editmode enabled', () => {
        const expected = { type: EVENT_TYPES.EDIT_ENABLED };
        expect(enableEditMode()).toEqual(expected);
      });
    });

    describe('disableEditMode', () => {
      it('should dispatch editmode disabled', () => {
        const expected = { type: EVENT_TYPES.EDIT_DISABLED };
        expect(disableEditMode()).toEqual(expected);
      });
    });

    describe('updateAppReadyState tracks loaded', () => {
      it('should dispatch editmode disabled', () => {
        const expected = { type: EVENT_TYPES.APP_READY_STATE_UPDATE };
        expect(updateAppReadyState({ tracks: true })).toEqual(expected);
      });
    });

    describe('map loaded', () => {
      it('should dispatch editmode disabled', () => {
        const expected = { type: EVENT_TYPES.APP_READY_STATE_UPDATE };
        expect(updateAppReadyState({ map: true })).toEqual(expected);
      });
    });

    describe('closeSelected', () => {
      it('should dispatch close selected', () => {
        const expected = { type: EVENT_TYPES.SELECTED_CLOSE };
        expect(closeSelected()).toEqual(expected);
      });
    });

    describe('openSelected', () => {
      it('should dispatch open selected', () => {
        const id = '1234';
        const expected = { id, type: EVENT_TYPES.SELECTED_OPEN };
        expect(openSelected(id)).toEqual(expected);
      });
    });

    describe('geolocateUser', () => {
      it('should dispatch user position latlng', () => {
        const point = { lat: 0, lng: 0 };
        const expected = { point, type: EVENT_TYPES.SET_USER_POSITION };
        expect(geolocateUser(point)).toEqual(expected);
      });
    });
  });
});
