import classnames from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import { KEY_CODE_ENTER } from '../../constants';
import { FirebaseAuthConsumer } from '../../core/firebase';
import { isOwner } from '../../helpers';
import { updateDraft, updateParcours } from '../../redux/actions';
import { selectParcours } from '../../redux/selectors';

const useStyles = createUseStyles({
  title: {
    '&:not(.readonly):focus': {
      background: 'rgba(255, 255, 255, 0.15)',
      padding: 12,
    },
    borderRadius: 8,
    color: 'rgba(255, 255, 255, 1)',
    composes: ['fs28', 'mx12', 'text-center'],
    fontWeight: 700,
    maxWidth: 280,
    padding: 7,
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

  const [content, setContent] = useState('');

  const blurHandler = useCallback(
    evt => {
      evt.preventDefault();
      const update = evt.target.value;
      const empty = !update || update.trim() === '';
      if (empty) return;
      const next = { ...selected, name: update.trim() };
      const updater = createmode ? updateDraft : updateParcours;
      dispatch(updater(next));
    },
    [createmode, dispatch, selected]
  );

  const keydownHandler = useCallback(
    evt => {
      const code = evt.keyCode;
      const isEnterKey = code === KEY_CODE_ENTER;
      if (!isEnterKey) return;
      const update = evt.target.value;
      const empty = !update || update.trim() === '';
      if (empty) return;
      const next = { ...selected, name: update.trim() };
      const updater = createmode ? updateDraft : updateParcours;
      dispatch(updater(next));
      evt.target.blur();
    },
    [createmode, dispatch, selected]
  );

  const nameHandler = useCallback(evt => {
    evt.preventDefault();
    const update = evt.target.value;
    setContent(update);
  }, []);

  useEffect(() => {
    setContent(selected.name);
  }, [selected.name]);

  return (
    <FirebaseAuthConsumer>
      {({ user }) => (
        <input
          className={classnames(classes.title)}
          readOnly={!isOwner(selected, user)}
          type="text"
          value={content}
          onBlur={blurHandler}
          onChange={nameHandler}
          onKeyDown={keydownHandler}
        />
      )}
    </FirebaseAuthConsumer>
  );
});

export default TitleComponent;
