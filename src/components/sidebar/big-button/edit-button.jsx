import Tippy from '@tippyjs/react';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { IoMdCreate as EditIcon } from 'react-icons/io';
import { createUseStyles } from 'react-jss';
import { useDispatch } from 'react-redux';

import { enableEditMode } from '../../../redux/actions';

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

const EditButtonComponent = function EditButtonComponent({ disabled }) {
  const classes = useStyles();
  const dispatch = useDispatch();

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

EditButtonComponent.propTypes = {
  disabled: PropTypes.bool.isRequired,
};

export default EditButtonComponent;
