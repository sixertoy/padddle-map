import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { isOwner } from '../../../../helpers';
import {
  disableEditMode,
  enableEditMode,
  openSelected,
} from '../../../../redux/actions';
import { selectParcours } from '../../../../redux/selectors';

const useParcours = parcours => {
  const dispatch = useDispatch();

  const [isSelected, setIsSelected] = useState(false);
  const [showDistances, setShowDistances] = useState(true);

  const user = useSelector(_ => _.user);
  const selected = useSelector(selectParcours);
  const editmode = useSelector(_ => _.editmode);
  const createmode = useSelector(_ => _.createmode);

  const selectHandler = useCallback(() => {
    if (createmode) return;
    if (editmode && !isSelected) {
      dispatch(disableEditMode());
    }
    dispatch(openSelected(parcours.id));
  }, [createmode, dispatch, editmode, isSelected, parcours.id]);

  const toggleEditHandler = useCallback(() => {
    const isowner = isOwner(parcours, user);
    if (!isowner || createmode) return;
    if (!editmode && isSelected) {
      dispatch(enableEditMode());
    } else if (editmode && !isSelected) {
      dispatch(disableEditMode());
      dispatch(openSelected(parcours.id));
      dispatch(enableEditMode());
    }
  }, [parcours, user, createmode, editmode, isSelected, dispatch]);

  useEffect(() => {
    const next = selected && selected.id === parcours.id;
    setIsSelected(next);
  }, [parcours.id, selected]);

  useEffect(() => {
    const next = !selected || isSelected;
    setShowDistances(next);
  }, [isSelected, selected]);

  return {
    opacity: 1,
    selectHandler,
    showDistances,
    toggleEditHandler,
  };
};

export default useParcours;
