import React, { useCallback } from 'react';
import { IoMdClose as CloseIcon } from 'react-icons/io';
import { createUseStyles } from 'react-jss';
import { useDispatch } from 'react-redux';

import { ZINDEX } from '../../constants';
import { closeShareModal } from '../../redux/actions';

const useStyles = createUseStyles({
  closebutton: {
    color: 'rgba(0, 0, 0, 0.25)',
    composes: ['is-absolute', 'text-center'],
    right: 0,
    top: 0,
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
    background: '#FFFFFF',
    borderRadius: 12,
    composes: ['is-absolute', 'px24', 'pb24', 'pt12'],
    height: 170,
    left: '50%',
    marginLeft: -160,
    top: 100,
    width: 320,
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

const LoginModalComponent = () => {
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
        <div className={classes.innerlay}>
          <div className={classes.wrapper}>
            <button
              className={classes.closebutton}
              type="button"
              onClick={closeHandler}>
              <CloseIcon />
            </button>
            <h1 className={classes.title}>
              <span>Connection</span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModalComponent;
