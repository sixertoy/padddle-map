import React from 'react';
import { createUseStyles } from 'react-jss';

import ImportButton from './import-button';
import LogoutButton from './logout-button';
import Avatar from './profile-picture';
import UserInfos from './user-infos';

const useStyles = createUseStyles({
  account: {
    padding: 12,
    width: 200,
  },
  container: {
    composes: ['fs16', 'flex-columns', 'flex-end'],
    fontFamily: '"mulish", helvetica, arial, sans-serif',
  },
});

const AccountComponent = function AccountComponent() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.account}>
        <Avatar />
        <UserInfos />
        <ImportButton />
        <LogoutButton />
      </div>
    </div>
  );
};

export default AccountComponent;
