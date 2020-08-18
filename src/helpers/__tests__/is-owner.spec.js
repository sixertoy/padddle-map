import isOwner from '../is-owner';

describe('src | helpers | isOwner', () => {
  it('return false, no arguments', () => {
    const expected = false;
    const result = isOwner();
    expect(result).toStrictEqual(expected);
  });

  it('return false, parcours is falsey', () => {
    const expected = false;
    const user = { uid: '1234' };
    const parcours = null;
    const result = isOwner(parcours, user);
    expect(result).toStrictEqual(expected);
  });

  it('return false, user is falsey', () => {
    const expected = false;
    const user = null;
    const parcours = { user: '1234' };
    const result = isOwner(parcours, user);
    expect(result).toStrictEqual(expected);
  });

  it('return false, parcours and user are not equals', () => {
    const expected = false;
    const user = { uid: '5678' };
    const parcours = { user: '1234' };
    const result = isOwner(parcours, user);
    expect(result).toStrictEqual(expected);
  });

  it('return true, parcours and user are equals', () => {
    const expected = true;
    const user = { uid: '1234' };
    const parcours = { user: '1234' };
    const result = isOwner(parcours, user);
    expect(result).toStrictEqual(expected);
  });

  it('return true, parcours and user are equals, and user is string', () => {
    const expected = true;
    const user = '1234';
    const parcours = { user: '1234' };
    const result = isOwner(parcours, user);
    expect(result).toStrictEqual(expected);
  });

  it('return false, parcours and user are equals, but uid is null', () => {
    const expected = false;
    const user = { uid: null };
    const parcours = { user: '1234' };
    const result = isOwner(parcours, user);
    expect(result).toStrictEqual(expected);
  });

  it('return false, parcours and user are equals, but uid is null', () => {
    const expected = false;
    const user = { uid: '1234' };
    const parcours = { user: null };
    const result = isOwner(parcours, user);
    expect(result).toStrictEqual(expected);
  });

  it('return false, parcours and user are equals, but are null', () => {
    const expected = false;
    const user = { uid: null };
    const parcours = { user: null };
    const result = isOwner(parcours, user);
    expect(result).toStrictEqual(expected);
  });
});
