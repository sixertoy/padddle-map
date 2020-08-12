import Tippy from '@tippyjs/react';
import get from 'lodash.get';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { IoIosAdd as PlusIcon } from 'react-icons/io';
import { createUseStyles } from 'react-jss';
import { useDispatch } from 'react-redux';

import { createDraft, openSelected } from '../../redux/actions';

const useStyles = createUseStyles({
  button: {
    '& .icon': {
      fontSize: '1em',
    },
    '&:hover': {
      background: '#FF5850',
      color: '#FFFFFF',
    },
    background: '#3388FF',
    borderRadius: '50%',
    color: '#FFFFFF',
    fontSize: '2.7rem',
    height: 60,
    lineHeight: 0,
    opacity: 1,
    outline: 'none',
    transition: 'all 0.3s',
    width: 60,
  },
  container: {
    composes: ['flex-columns', 'items-center'],
  },
});

const BigButtonComponent = ({ user }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const clickHandler = useCallback(() => {
    const uid = get(user, 'uid', null);
    dispatch(createDraft(uid));
    dispatch(openSelected(uid));
  }, [dispatch, user]);

  return (
    <Tippy content="Ajouter un parcours" placement="left">
      <button className={classes.button} type="button" onClick={clickHandler}>
        <PlusIcon className="icon" />
      </button>
    </Tippy>
  );
};

BigButtonComponent.propTypes = {
  user: PropTypes.shape().isRequired,
};

export default BigButtonComponent;
