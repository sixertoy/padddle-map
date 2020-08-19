import Tippy from '@tippyjs/react';
import React, { useCallback } from 'react';
import { IoIosAdd as PlusIcon } from 'react-icons/io';
import { createUseStyles } from 'react-jss';
import { useDispatch } from 'react-redux';

import { createDraft } from '../../../redux/actions';

const useStyles = createUseStyles({
  button: {
    '&:hover': {
      background: '#112E7F',
    },
    background: '#3388FF',
    borderRadius: '50%',
    color: '#FFFFFF',
    composes: ['fs48', 'mb7'],
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

const CreateButtonComponent = function CreateButtonComponent() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const createHandler = useCallback(() => {
    dispatch(createDraft());
  }, [dispatch]);

  return (
    <Tippy content="Ajouter un parcours" placement="left">
      <button className={classes.button} type="button" onClick={createHandler}>
        <PlusIcon />
      </button>
    </Tippy>
  );
};

export default CreateButtonComponent;
