import classnames from 'classnames';
import React, { useCallback } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import { updateDraft, updateParcours } from '../../redux/actions';
import { selectParcours } from '../../redux/selectors';

const useStyles = createUseStyles({
  title: {
    '&:not(.readonly):focus': {
      background: 'rgba(255, 255, 255, 0.15)',
      padding: '7px 12px',
    },
    borderRadius: 8,
    color: 'rgba(255, 255, 255, 1)',
    composes: ['fs28'],
    fontWeight: 700,
    maxWidth: '100%',
    textOverflow: 'ellipsis',
    transition: 'all 0.2s',
    whiteSpace: 'nowrap',
  },
});

const TitleComponent = React.memo(() => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const user = useSelector(_ => _.user);
  const selected = useSelector(selectParcours);
  const createmode = useSelector(_ => _.createmode);

  const readonly = user.uid !== selected.user;

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
      className={classnames(classes.title, { readonly })}
      readOnly={readonly}
      type="text"
      value={selected.name}
      onChange={nameHandler}
    />
  );
});

export default TitleComponent;
