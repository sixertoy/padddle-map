import pick from 'lodash.pick';
import { useDispatch, useSelector } from 'react-redux';

import { getPathPoints } from '../../../../helpers';
import { updateParcours } from '../../../../redux/actions';
import { selectParcours } from '../../../../redux/selectors';

const useRemovable = ({ track }) => {
  const dispatch = useDispatch();
  const parcours = useSelector(selectParcours);
  const { polygon } = pick(parcours, ['points', 'polygon']);

  const removeHandler = index => () => {
    const line = track.current.leafletElement;
    const latlngs = getPathPoints(line.getLatLngs());
    const removeLimit = latlngs.length <= 2;
    if (removeLimit) return;
    const next = latlngs.filter((obj, i) => index !== i);
    const ispolygon = next.length > 2 && polygon;
    dispatch(updateParcours({ ...parcours, points: next, polygon: ispolygon }));
  };

  return removeHandler;
};

export default useRemovable;
