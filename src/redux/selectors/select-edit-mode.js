import get from 'lodash.get';
import { createSelector } from 'reselect';

const getEditMode = state => get(state, 'editmode', []);

const selectEditMode = createSelector(getEditMode, value => value);

export default selectEditMode;
