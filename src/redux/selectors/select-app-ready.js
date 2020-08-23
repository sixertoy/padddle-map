import get from 'lodash.get';
import { createSelector } from 'reselect';

const getAppReady = _ => _.appready;

const selectAppReady = createSelector(getAppReady, appready => {
  const map = get(appready, 'map', false);
  const tracks = get(appready, 'tracks', false);
  const state = !!(tracks && map);
  return { map, state, tracks };
});

export default selectAppReady;
