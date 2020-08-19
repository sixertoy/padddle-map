import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// import { isOwner } from '../../../../helpers';
// import {
//   disableEditMode,
//   enableEditMode,
//   openSelected,
// } from '../../../../redux/actions';
import { selectParcours } from '../../../../redux/selectors';

const useParcours = parcours => {
  // const dispatch = useDispatch();

  const [isSelected, setIsSelected] = useState(false);
  const [showDistances, setShowDistances] = useState(true);

  // const user = useSelector(_ => _.user);
  const selected = useSelector(selectParcours);
  // const editmode = useSelector(_ => _.editmode);
  // const createmode = useSelector(_ => _.createmode);

  const selectHandler = useCallback(() => {
    // @TODO REDUCER
    // if (createmode) return;
    // if (editmode && !isSelected) {
    //   dispatch(disableEditMode());
    // }
    // dispatch(openSelected(parcours.id));
  }, []);

  const toggleEditHandler = useCallback(() => {
    // @TODO REDUCER
    // const isowner = isOwner(parcours, user);
    // if (!isowner || createmode) return;
    // if (!editmode && isSelected) {
    //   dispatch(enableEditMode());
    // } else if (editmode && !isSelected) {
    //   dispatch(disableEditMode());
    //   dispatch(openSelected(parcours.id));
    //   dispatch(enableEditMode());
    // }
  }, []);

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
