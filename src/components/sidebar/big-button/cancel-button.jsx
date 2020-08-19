import Tippy from '@tippyjs/react';
import React, { useCallback } from 'react';
import { IoIosClose as CloseIcon } from 'react-icons/io';
import { createUseStyles } from 'react-jss';
import { useDispatch } from 'react-redux';

import { closeSelected } from '../../../redux/actions';

const useStyles = createUseStyles({
  button: {
    '&:hover': {
      background: '#112E7F',
    },
    background: '#3388FF',
    borderRadius: '50%',
    color: '#FFFFFF',
    composes: ['fs32', 'mb7'],
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

const CancelButtonComponent = function CancelButtonComponent() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const cancelHandler = useCallback(() => {
    dispatch(closeSelected());
  }, [dispatch]);

  return (
    <Tippy content="Fermer" placement="left">
      <button className={classes.button} type="button" onClick={cancelHandler}>
        <CloseIcon />
      </button>
    </Tippy>
  );
};

export default CancelButtonComponent;
