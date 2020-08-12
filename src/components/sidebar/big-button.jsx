import Tippy from '@tippyjs/react';
import classnames from 'classnames';
import get from 'lodash.get';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { IoIosAdd as PlusIcon } from 'react-icons/io';
// import { IoIosAdd as PlusIcon, IoIosSave as SaveIcon } from 'react-icons/io';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import {
  cancelDraft,
  closePopup,
  createDraft,
  disableEditMode,
  openPopup,
} from '../../redux/actions';

const useStyles = createUseStyles({
  button: {
    '& .icon': {
      transform: 'rotate(0deg)',
      transition: 'transform 0.3s',
    },
    '&.cancelable': {
      '& .icon': { transform: `rotate(${360 + 45}deg)` },
      background: '#FF5850',
      color: '#FFFFFF',
    },
    '&.mounted': {
      animation:
        'scale-up-center 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both',
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
});

const BigButtonComponent = ({ user }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  // const draft = useSelector(_ => _.draft);
  // const selected = useSelector(_ => _.selected);
  const editmode = useSelector(_ => _.editmode);
  const createmode = useSelector(_ => _.createmode);

  const [mounted, setMounted] = useState(false);
  const [label, setLabel] = useState();

  const clickHandler = useCallback(() => {
    if (createmode) {
      dispatch(cancelDraft());
      dispatch(closePopup());
    } else if (editmode) {
      dispatch(disableEditMode());
      dispatch(closePopup());
    } else {
      const uid = get(user, 'uid', null);
      dispatch(createDraft(uid));
      dispatch(openPopup(uid));
    }
  }, [createmode, dispatch, editmode, user]);

  useEffect(() => {
    if (!mounted) setMounted(true);
  }, [mounted]);

  useEffect(() => {
    if (createmode || editmode) {
      setLabel('Annuler');
    } else {
      setLabel('Ajouter un parcours');
    }
  }, [createmode, editmode]);

  return (
    <Tippy content={label} placement="left">
      <button
        className={classnames(classes.button, {
          cancelable: editmode || createmode,
          mounted,
        })}
        type="button"
        onClick={clickHandler}>
        <PlusIcon className="icon" />
      </button>
    </Tippy>
  );
};

BigButtonComponent.propTypes = {
  user: PropTypes.shape().isRequired,
};

export default BigButtonComponent;
