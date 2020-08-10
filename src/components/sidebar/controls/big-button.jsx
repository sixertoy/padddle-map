import Tippy from '@tippyjs/react';
import classnames from 'classnames';
import get from 'lodash.get';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { IoIosAdd as PlusIcon, IoIosSave as SaveIcon } from 'react-icons/io';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import {
  cancelDraft,
  closePopup,
  createDraft,
  disableEditMode,
} from '../../../redux/actions';

const useStyles = createUseStyles({
  button: {
    '&.createmode': {
      background: '#FF5850',
      color: '#FFFFFF',
    },
    '&.editmode': {
      background: '#3388FF',
      color: '#FFFFFF',
    },
    '&.mounted': {
      animation:
        'scale-up-center 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both',
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
  const editmode = useSelector(_ => _.editmode);
  const createmode = useSelector(_ => _.createmode);

  const [mounted, setMounted] = useState(false);
  const tippyContent = createmode ? 'Annuler' : 'Ajouter un parcours';

  const clickHandler = useCallback(() => {
    if (selected) dispatch(closePopup());
    if (editmode) dispatch(disableEditMode());
    if (createmode) dispatch(cancelDraft());
    if (!createmode) {
      const uid = get(user, 'uid', null);
      dispatch(createDraft(uid));
    }
  }, [selected, dispatch, editmode, createmode, user]);

  useEffect(() => {
    if (!mounted) setMounted(true);
  }, [mounted]);

  return (
    <Tippy content={tippyContent} placement="left">
      <button
        className={classnames(classes.button, { createmode, mounted })}
        type="button"
        onClick={clickHandler}>
        {!editmode && (
          <PlusIcon className={classnames(classes.icon, { createmode })} />
        )}
        {editmode && (
          <SaveIcon className={classnames(classes.icon, { editmode })} />
        )}
      </button>
    </Tippy>
  );
};

BigButtonComponent.propTypes = {
  user: PropTypes.shape().isRequired,
};

export default BigButtonComponent;
