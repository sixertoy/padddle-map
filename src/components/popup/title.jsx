import React, { useCallback } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import { updateDraft, updateParcours } from '../../redux/actions';
import { selectParcours } from '../../redux/selectors';

const useStyles = createUseStyles({
  title: {
    composes: ['is-bold', 'fs24'],
  },
});

const TitleComponent = React.memo(() => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const user = useSelector(_ => _.user);
  const selected = useSelector(selectParcours);
  const createmode = useSelector(_ => _.createmode);

  const readonly = user.id === selected.user;

  const nameHandler = useCallback(
    ({ target }) => {
      const name = target.value;
      const next = { ...selected, name };
      if (createmode) dispatch(updateDraft(next));
      if (!createmode) dispatch(updateParcours(next));
    },
    [createmode, dispatch, selected]
  );

  return (
    <input
      className={classes.title}
      readOnly={readonly}
      type="text"
      value={selected.name}
      onChange={nameHandler}
    />
  );
});

export default TitleComponent;
