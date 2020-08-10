import Tippy from '@tippyjs/react';
import classnames from 'classnames';
import get from 'lodash.get';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { IoIosAdd as PlusIcon } from 'react-icons/io';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import { cancelDraft, closePopup, createDraft } from '../../redux/actions';

const useStyles = createUseStyles({
  button: {
    '&.createmode': {
      background: '#FF5850',
      color: '#FFFFFF',
    },
    '&.mounted': {
      animation:
        'scale-up-center 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both',
    },
    '&.small': {
      fontSize: '1rem',
      height: 40,
      marginRight: 7,
      width: 40,
    },
    '&:hover': {
      background: '#FF5850',
      color: '#FFFFFF',
    },
    background: '#FFFFFF',
    borderRadius: '50%',
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
  icon: {
    '&.createmode': {
      transform: `rotate(${360 + 45}deg)`,
    },
    transform: 'rotate(0deg)',
    transition: 'transform 0.3s',
  },
});

const BigButtonComponent = ({ user }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const selected = useSelector(_ => _.selected);
  const createmode = useSelector(_ => _.createmode);

  const [mounted, setMounted] = useState(false);
  const tippyContent = createmode ? 'Annuler' : 'Ajouter un parcours';

  const clickHandler = useCallback(() => {
    if (selected) dispatch(closePopup());
    if (createmode) dispatch(cancelDraft());
    if (!createmode) {
      const uid = get(user, 'uid', null);
      dispatch(createDraft(uid));
    }
  }, [user, selected, dispatch, createmode]);

  useEffect(() => {
    if (!mounted) setMounted(true);
  }, [mounted]);

  return (
    <Tippy content={tippyContent} placement="left">
      <button
        className={classnames(classes.button, { createmode, mounted })}
        type="button"
        onClick={clickHandler}>
        <PlusIcon className={classnames(classes.icon, { createmode })} />
      </button>
    </Tippy>
  );
};

BigButtonComponent.propTypes = {
  user: PropTypes.shape().isRequired,
};

export default BigButtonComponent;
