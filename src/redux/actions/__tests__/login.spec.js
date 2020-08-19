import { EVENT_TYPES } from '../../../constants';
import { loginUser, logoutUser } from '../login';

describe('src | redux | actions', () => {
  describe('login', () => {
    describe('loginUser', () => {
      it('should dispatch logged user object', () => {
        const user = 'Hello world!';
        const expected = { type: EVENT_TYPES.USER_LOGIN, user };
        expect(loginUser(user)).toEqual(expected);
      });
    });

    describe('logoutUser', () => {
      it('should dispatch logout', () => {
        const expected = { type: EVENT_TYPES.USER_LOGOUT };
        expect(logoutUser()).toEqual(expected);
      });
    });
  });
});
