import Tippy from '@tippyjs/react';
import get from 'lodash.get';
import React, { useCallback } from 'react';
import { IoIosSave as EditIcon } from 'react-icons/io';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import { commitDraft } from '../../../redux/actions';
import { selectParcours } from '../../../redux/selectors';

const useStyles = createUseStyles({
  button: {
    '&:hover': {
      background: '#112E7F',
    },
    background: '#3388FF',
    borderRadius: '50%',
    color: '#FFFFFF',
    composes: ['fs22', 'mb7'],
    height: 60,
    lineHeight: 0,
    outline: 'none',
    transition: 'all 0.3s',
    width: 60,
  },
  [`@media (max-width: ${680}px)`]: {
    button: {
      fontSize: '24px !important',
      height: 40,
      width: 40,
    },
  },
});

const CommitButtonComponent = function CommitButtonComponent() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const parcours = useSelector(selectParcours);
  const points = get(parcours, 'points', []);
  const disabled = points.length <= 1;

  const commitHandler = useCallback(() => {
    dispatch(commitDraft());
  }, [dispatch]);

  return (
    <Tippy content="Enregistrer" placement="left">
      <button
        className={classes.button}
        disabled={disabled}
        type="button"
        onClick={commitHandler}>
        <EditIcon />
      </button>
    </Tippy>
  );
};

export default CommitButtonComponent;
