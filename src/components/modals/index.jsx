import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { IoMdClose as CloseIcon } from 'react-icons/io';
import { createUseStyles } from 'react-jss';
import { useDispatch } from 'react-redux';

import { ZINDEX } from '../../constants';
import { closeShareModal } from '../../redux/actions';
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
    '&.share': {
      height: 185,
      marginLeft: -160,
      width: 320,
    },
    background: '#FFFFFF',
    borderRadius: 7,
    boxShadow: '0px 0px 11px -2px rgba(0,0,0,0.45)',
    composes: ['is-absolute', 'p24'],
    left: '50%',
    top: 100,
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
});

const ModalsComponent = ({ type }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const closeHandler = useCallback(() => {
    dispatch(closeShareModal());
  }, [dispatch]);

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div
          className={classes.overlay}
          role="button"
          tabIndex="-1"
          onClick={closeHandler}
        />
        <div className={classnames(classes.innerlay, { [type]: true })}>
          <div className={classes.wrapper}>
            <button
              className={classes.closebutton}
              type="button"
              onClick={closeHandler}>
              <CloseIcon />
            </button>
            <h1 className={classes.title}>
              {type === 'share' && <span>Partager</span>}
              {type === 'login' && <span>Connection</span>}
            </h1>
            {type === 'share' && <ShareModal />}
            {type === 'login' && <LoginModal />}
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
