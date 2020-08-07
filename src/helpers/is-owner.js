import get from 'lodash.get';

const isOwner = (selected, user) => {
  if (!selected || !user) return false;
  return selected.user === get(user, 'uid', null);
};

export default isOwner;
