import classnames from 'classnames';
import React, { useCallback } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import { FirebaseAuthConsumer } from '../../core/firebase';
import { isOwner } from '../../helpers';
import { updateDraft, updateParcours } from '../../redux/actions';
import { selectParcours } from '../../redux/selectors';

const useStyles = createUseStyles({
  title: {
    '&:not(.readonly):focus': {
      background: 'rgba(255, 255, 255, 0.15)',
      marginTop: 12,
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

  const selected = useSelector(selectParcours);
  const createmode = useSelector(_ => _.createmode);

  const nameHandler = useCallback(
    ({ target }) => {
      const name = target.value;
      const next = { ...selected, name };
      const updater = createmode ? updateDraft : updateParcours;
      dispatch(updater(next));
    },
    [createmode, dispatch, selected]
  );

  return (
    <FirebaseAuthConsumer>
      {({ user }) => (
        <input
          className={classnames(classes.title)}
          defaultValue={selected.name}
          readOnly={!isOwner(selected, user)}
          type="text"
          onChange={nameHandler}
        />
      )}
    </FirebaseAuthConsumer>
  );
});

export default TitleComponent;
