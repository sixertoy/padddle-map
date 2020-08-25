import get from 'lodash.get';
import { createSelector } from 'reselect';

const getDemoMode = _ => _.demomode;

const selectDemoMode = createSelector(getDemoMode, demomode => {
  const authed = get(demomode, 'authed', true);
  const unauthed = get(demomode, 'unauthed', true);
  const state = authed || unauthed;
  return { authed, state, unauthed };
});

export default selectDemoMode;
