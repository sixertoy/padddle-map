import get from 'lodash.get';

import { IS_ADMIN } from '../constants';

const isOwner = (parcours, user) => {
  if (IS_ADMIN) return true;
  if (!parcours || !user) return false;
  const uid = typeof user === 'string' ? user : get(user, 'uid', null);
  const suid = get(parcours, 'user', null);
  return !!(uid && suid && suid === uid);
};

export default isOwner;
