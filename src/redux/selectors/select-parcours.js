import get from 'lodash.get';
import { createSelector } from 'reselect';

const getParcours = state => get(state, 'parcours', []);

const selectParcours = createSelector(getParcours, items => items);

export default selectParcours;
