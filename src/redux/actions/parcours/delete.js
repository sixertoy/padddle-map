import { EVENT_TYPES } from '../../../constants';
import { db } from '../../../core/firebase';

const deleteParcours = id => dispatch => {
  return db.remove(id, 'parcours').then(() => {
    dispatch({ id, type: EVENT_TYPES.PARCOURS_DELETE });
  });
};

export default deleteParcours;
