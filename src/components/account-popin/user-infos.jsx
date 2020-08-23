import get from 'lodash.get';
import React from 'react';
import { createUseStyles } from 'react-jss';

import { FirebaseAuthConsumer } from '../../core/firebase';

const useStyles = createUseStyles({
  email: {
    color: '#959AA0',
    display: 'block',
    fontSize: '0.7em',
  },
  infos: {
    composes: ['py24', 'text-center'],
    letterSpacing: '0.02em',
  },
  name: {
    display: 'block',
    fontWeight: 'bold',
  },
});

const UserInfosComponent = () => {
  const classes = useStyles();
  return (
    <FirebaseAuthConsumer>
      {({ user }) => {
        const email = get(user, 'email', null);
        const name = get(user, 'displayName', null);
        return (
          <div className={classes.infos}>
            {name && <span className={classes.name}>{name}</span>}
            <span className={classes.email}>{email}</span>
          </div>
        );
      }}
    </FirebaseAuthConsumer>
  );
};

export default UserInfosComponent;
