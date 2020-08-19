import { EVENT_TYPES } from '../../../../constants';
import updateDraft from '../update';

describe('src | redux | actions', () => {
  describe('draft', () => {
    describe('updateDraft', () => {
      it('should dispatch updated draft', () => {
        const data = {
          color: 0,
          id: expect.any(String),
          name: expect.any(String),
          points: [],
          polygon: false,
          user: '1234',
        };
        const expected = {
          data: { ...data, mtime: expect.any(Number) },
          type: EVENT_TYPES.DRAFT_UPDATE,
        };
        expect(updateDraft(data)).toEqual(expected);
      });
    });
  });
});
