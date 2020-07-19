import get from 'lodash.get';
import { createSelector } from 'reselect';

const getDraft = state => get(state, 'draft', []);

const selectDraft = createSelector(getDraft, value => value);

export default selectDraft;
