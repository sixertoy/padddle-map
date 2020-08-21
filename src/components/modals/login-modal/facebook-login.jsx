import React, { useCallback, useState } from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { FaFacebookSquare as BrandIcon } from 'react-icons/fa';
import { createUseStyles } from 'react-jss';

import { IS_DEVELOPMENT } from '../../../constants';
import { checkLoginState } from '../../../core/facebook';

const useStyles = createUseStyles({
  button: {
    background: '#4267B2',
    borderRadius: 4,
    color: '#FFF',
    composes: ['flex-columns', 'flex-center', 'items-center', 'p12'],
    maxWidth: '100%',
    minWidth: '100%',
    width: '100%',
  },
  icon: {
    fontSize: '1.2rem',
    marginLeft: 7,
  },
});

const redirectUri = IS_DEVELOPMENT
  ? 'http://localhost:3000'
  : 'https://padddle.io';

const FacebookLoginProviderComponent = function FacebookLoginProviderComponent() {
  const classes = useStyles();

  const [disabled, setDisabled] = useState(false);

  const clickHandler = useCallback((evt, onClick) => {
    setDisabled(true);
    onClick(evt);
  }, []);

  const callbackHandler = useCallback(result => {
    checkLoginState(result);
  }, []);

  return (
    <FacebookLogin
      appId="288008652477160"
      callback={callbackHandler}
      redirectUri={redirectUri}
      render={({ onClick }) => (
        <button
          className={classes.button}
          disabled={disabled}
          type="button"
          onClick={evt => clickHandler(evt, onClick)}>
          <span>Connexion</span>
          <BrandIcon className={classes.icon} />
        </button>
      )}
    />
  );
};

export default FacebookLoginProviderComponent;
