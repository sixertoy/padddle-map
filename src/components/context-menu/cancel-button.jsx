import Tippy from '@tippyjs/react';
import React, { useCallback } from 'react';
import { IoIosAdd as PlusIcon } from 'react-icons/io';
import { createUseStyles } from 'react-jss';
import { useDispatch } from 'react-redux';

import { closeSelected } from '../../redux/actions';

const useStyles = createUseStyles({
  button: {
    '& .icon': {
      transform: 'rotate(45deg)',
    },
    '&:hover': {
      background: '#B13333',
    },
    background: '#FF5950',
    borderRadius: '50%',
    color: '#FFFFFF',
    composes: ['ml7'],
    fontSize: '2.1rem',
    height: 40,
    lineHeight: 0,
    outline: 'none',
    transition: 'all 0.3s',
    width: 40,
  },
  [`@media (max-width: ${680}px)`]: {
    button: {
      fontSize: '16px !important',
      height: 35,
      marginLeft: '0 !important',
      width: 35,
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
    <Tippy content="Annuler" placement="left">
      <button className={classes.button} type="button" onClick={cancelHandler}>
        <PlusIcon className="icon" />
      </button>
    </Tippy>
  );
};

export default CancelButtonComponent;
