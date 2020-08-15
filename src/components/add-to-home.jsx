import React, { useCallback, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';

import { ZINDEX } from '../constants';

const useStyles = createUseStyles({
  button: {
    background: '#FFFFFF',
    borderRadius: 4,
    composes: ['p12'],
  },
  container: {
    bottom: 12,
    composes: ['is-absolute'],
    zIndex: ZINDEX.MODAL,
  },
});

const AddToHomeComponent = () => {
  const classes = useStyles();
  const [prompt, setPrompted] = useState(null);

  const promptToInstall = useCallback(() => {
    try {
      prompt.prompt();
    } catch (err) {
      Promise.reject(err);
    }
  }, [prompt]);

  const readyHandler = useCallback(evt => {
    setPrompted(evt);
    evt.preventDefault();
  }, []);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', readyHandler);
    return () => {
      window.removeEventListener('beforeinstallprompt', readyHandler);
    };
  }, [readyHandler]);

  return (
    <div className={classes.container}>
      {prompt && (
        <button
          className={classes.button}
          type="button"
          onClick={promptToInstall}>
          Install
        </button>
      )}
    </div>
  );
};

AddToHomeComponent.defaultProps = {};

AddToHomeComponent.propTypes = {};

export default AddToHomeComponent;
