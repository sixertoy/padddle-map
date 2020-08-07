import get from 'lodash.get';

const isOwner = (selected, user) =>
  !selected || !user ? false : selected.user === get(user, 'uid', null);

export default isOwner;
