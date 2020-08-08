import React, { useCallback, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import { KEY_CODE_ENTER } from '../../constants';
import { FirebaseAuthConsumer } from '../../core/firebase';
import { isOwner } from '../../helpers';
import { updateDraft, updateParcours } from '../../redux/actions';
import { selectParcours } from '../../redux/selectors';

const useStyles = createUseStyles({
  container: {
    composes: ['mx7'],
    flex: 1,
    maxWidth: 280,
  },
  title: {
    '&:not(.readonly):focus': {
      background: 'rgba(0, 0, 0, 0.07)',
      padding: 12,
    },
    borderRadius: 8,
    color: 'rgba(0, 0, 0, 0.85)',
    composes: ['fs24', 'text-center', 'is-light'],
    minWidth: 100,
    padding: 7,
    textOverflow: 'ellipsis',
    transition: 'all 0.2s',
    whiteSpace: 'nowrap',
    width: '100%',
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

  const focusHandler = useCallback(evt => {
    const { target } = evt;
    target.scrollLeft = target.scrollWidth + 10;
  }, []);

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
        <div className={classes.container}>
          <input
            className={classes.title}
            readOnly={!isOwner(selected, user)}
            type="text"
            value={content}
            onBlur={blurHandler}
            onChange={nameHandler}
            onFocus={focusHandler}
            onKeyDown={keydownHandler}
          />
        </div>
      )}
    </FirebaseAuthConsumer>
  );
});

export default TitleComponent;
