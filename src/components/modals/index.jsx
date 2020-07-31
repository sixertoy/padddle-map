import React from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import LoginModal from './login-modal';
import ShareModal from './share-modal';

const useStyles = createUseStyles({
  container: {},
});

const ModalsComponent = () => {
  const classes = useStyles();
  const modal = useSelector(_ => _.modal);
  return (
    <div className={classes.container}>
      {modal && modal === 'share' && <ShareModal />}
      {modal && modal === 'login' && <LoginModal />}
    </div>
  );
};

ModalsComponent.defaultProps = {};

ModalsComponent.propTypes = {};

export default ModalsComponent;
