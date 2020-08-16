import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { IoMdClose as CloseIcon } from 'react-icons/io';
import { createUseStyles } from 'react-jss';
import { useDispatch } from 'react-redux';

import { ZINDEX } from '../../constants';
import { closeShareModal } from '../../redux/actions';
import DeleteModal from './delete-modal';
import LoginModal from './login-modal';
import ShareModal from './share-modal';

const useStyles = createUseStyles({
  closebutton: {
    color: 'rgba(0, 0, 0, 0.25)',
    composes: ['is-absolute', 'text-center'],
    right: -12,
    top: -12,
  },
  container: {
    bottom: 0,
    composes: ['is-absolute'],
    left: 0,
    right: 0,
    top: 0,
    zIndex: ZINDEX.MODAL,
  },
  innerlay: {
    '&.delete': {
      height: 180,
      marginLeft: -160,
      width: 380,
    },
    '&.login': {
      marginLeft: -140,
      width: 280,
    },
    '&.mounted': { opacity: 1, top: 100 },
    '&.share': {
      height: 'auto',
      marginLeft: -160,
      width: 320,
    },
    background: '#FFFFFF',
    borderRadius: 7,
    boxShadow: '0px 0px 11px -2px rgba(0,0,0,0.45)',
    composes: ['is-absolute', 'p24'],
    left: '50%',
    opacity: 0,
    top: 200,
    transition: 'all 0.3s',
  },
  overlay: {
    background: 'rgba(0, 0, 0, 0.45)',
    bottom: 0,
    composes: ['is-absolute', 'is-block'],
    left: 0,
    right: 0,
    top: 0,
  },
  title: {
    composes: ['is-bold', 'mb24'],
    fontSize: '1.4rem',
  },
  wrapper: {
    composes: ['is-relative', 'is-full-layout'],
  },
  [`@media (max-width: ${680}px)`]: {
    closebutton: {
      display: 'none',
      visibility: 'hidden',
    },
    innerlay: {
      '&.delete': {
        height: 180,
        width: '100%',
      },
      '&.mounted': { bottom: 0, opacity: 1 },
      borderRadius: '0 !important',
      bottom: -200,
      left: 0,
      marginLeft: '0 !important',
      padding: '24px 12px !important',
      right: 0,
      top: 'inherit !important',
      width: '100% !important',
    },
    title: {
      display: 'none',
      visibility: 'hidden',
    },
  },
});

const ModalsComponent = function ModalsComponent({ type }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [mounted, setMounted] = useState(false);

  const closeHandler = useCallback(() => {
    dispatch(closeShareModal());
  }, [dispatch]);

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
    }
  }, [mounted]);

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div
          className={classes.overlay}
          role="button"
          tabIndex="-1"
          onClick={closeHandler}
        />
        <div
          className={classnames(classes.innerlay, { mounted, [type]: true })}>
          <div className={classes.wrapper}>
            <button
              className={classes.closebutton}
              type="button"
              onClick={closeHandler}>
              <CloseIcon />
            </button>
            {type !== 'delete' && (
              <h1 className={classes.title}>
                {type === 'share' && <span>Partager</span>}
                {type === 'login' && <span>Se connecter</span>}
              </h1>
            )}
            {type === 'share' && <ShareModal />}
            {type === 'login' && <LoginModal />}
            {type === 'delete' && <DeleteModal />}
          </div>
        </div>
      </div>
    </div>
  );
};

ModalsComponent.propTypes = {
  type: PropTypes.string.isRequired,
};

export default ModalsComponent;
