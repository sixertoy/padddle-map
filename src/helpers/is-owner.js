import get from 'lodash.get';

import { IS_OWNER } from '../constants';

const isOwner = (parcours, user) => {
  if (IS_OWNER) return true;
  if (!parcours || !user) return false;
  const uid = typeof user === 'string' ? user : get(user, 'uid', null);
  const suid = get(parcours, 'user', null);
  return suid === uid;
};

export default isOwner;
