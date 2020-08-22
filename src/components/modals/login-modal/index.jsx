import React from 'react';
import useCreateStyles from 'react-jss';
import { useSelector } from 'react-redux';

import { IS_DEVELOPMENT } from '../../../constants';
import FacebookLoginProvider from './facebook-login';
import GoogleProvider from './google';

const useStyles = useCreateStyles({
  buttons: {},
  container: {},
  description: {
    composes: ['mb12', 'fs18'],
  },
});

const LoginModalComponent = function LoginModalComponent() {
  const classes = useStyles();
  const debugmode = useSelector(_ => _.debugmode);
  const useFacebook = debugmode || !IS_DEVELOPMENT;
  const useGoogle = IS_DEVELOPMENT && !useFacebook;
  return (
    <div className={classes.container}>
      <div className={classes.description}>
        Connectez-vous pour ajouter vos parcours et partagez les avec la
        communauté
      </div>
      <div className={classes.buttons}>
        {useGoogle && <GoogleProvider />}
        {useFacebook && <FacebookLoginProvider />}
      </div>
    </div>
  );
};

export default LoginModalComponent;
