import Tippy from '@tippyjs/react';
import React, { useCallback } from 'react';
import { IoIosClose as CloseIcon } from 'react-icons/io';
import { createUseStyles } from 'react-jss';
import { useDispatch } from 'react-redux';

import { cancelDraft } from '../../../redux/actions';

const useStyles = createUseStyles({
  button: {
    '&:hover': {
      background: '#B13333',
    },
    background: '#FF5950',
    borderRadius: '50%',
    color: '#FFFFFF',
    composes: ['fs24'],
    height: 40,
    lineHeight: 0,
    outline: 'none',
    transition: 'all 0.3s',
    width: 40,
  },
  [`@media (max-width: ${680}px)`]: {
    button: {
      marginLeft: '0 !important',
    },
  },
});

const CancelButtonComponent = function CancelButtonComponent() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const cancelHandler = useCallback(() => {
    dispatch(cancelDraft());
  }, [dispatch]);

  return (
    <Tippy content="Annuler" placement="left">
      <button className={classes.button} type="button" onClick={cancelHandler}>
        <CloseIcon />
      </button>
    </Tippy>
  );
};

export default CancelButtonComponent;
