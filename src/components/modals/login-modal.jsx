import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  container: {
    composes: ['is-absolute'],
  },
});

const LoginModalComponent = () => {
  const classes = useStyles();
  const [url, setURL] = useState(window.location.href);

  useEffect(() => {
    setURL(window.location.href);
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.overlay} />
      <div className={classes.inerlay}>{url}</div>
    </div>
  );
};

export default LoginModalComponent;
