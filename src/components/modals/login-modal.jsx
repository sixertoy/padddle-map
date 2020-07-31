import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  container: {},
});

const LoginModalComponent = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <button className={classes.container} type="button" onClick={() => {}} />
    </React.Fragment>
  );
};

export default LoginModalComponent;
