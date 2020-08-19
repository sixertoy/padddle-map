import Tippy from '@tippyjs/react';
import React, { useCallback } from 'react';
import { IoMdCreate as EditIcon } from 'react-icons/io';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import { isOwner } from '../../../helpers';
import { enableEditMode } from '../../../redux/actions';
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

const EditButtonComponent = function EditButtonComponent() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const user = useSelector(_ => _.user);
  const parcours = useSelector(selectParcours);
  const disabled = !isOwner(parcours, user);

  const editHandler = useCallback(() => {
    dispatch(enableEditMode());
  }, [dispatch]);

  return (
    <Tippy content="Modifier" placement="left">
      <button
        className={classes.button}
        disabled={disabled}
        type="button"
        onClick={editHandler}>
        <EditIcon />
      </button>
    </Tippy>
  );
};

export default EditButtonComponent;
