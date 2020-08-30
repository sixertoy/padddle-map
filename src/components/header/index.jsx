import React from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

import { IfFirebaseAuthed, IfFirebaseUnAuthed } from '../../core/firebase';
import AccountButton from './account-button';
import HeaderDebugger from './debugger';
import LoginButton from './login-button';
import HeaderLogo from './logo';

const useStyles = createUseStyles({
  header: {
    background: '#FFFFFF',
    color: '#FF5850',
    composes: [
      'is-relative',
      'p12',
      'flex-0',
      'flex-columns',
      'flex-between',
      'items-center',
    ],
    height: 60,
  },
  headerLogin: {
    composes: ['flex-columns', 'flex-end', 'items-center'],
    flex: 0,
  },
  [`@media (max-width: ${680}px)`]: {
    header: {
      background:
        'linear-gradient(45deg, rgba(255,89,80,1) 0%, rgba(255,89,80,1) 59%, rgba(255,106,80,1) 100%)',
      color: '#FFFFFF',
    },
  },
});

const HeaderComponent = React.memo(function HeaderComponent() {
  const classes = useStyles();
  const debugmode = useSelector(_ => _.debugmode);
  const isMobile = useMediaQuery({ query: '(max-width: 680px)' });

  return (
    <div className={classes.header}>
      <HeaderLogo />
      <div className={classes.headerLogin}>
        <IfFirebaseUnAuthed and={() => !isMobile}>
          <LoginButton />
        </IfFirebaseUnAuthed>
        <IfFirebaseAuthed>
          {({ user }) => <AccountButton user={user} />}
        </IfFirebaseAuthed>
      </div>
      {debugmode && <HeaderDebugger />}
    </div>
  );
});

export default HeaderComponent;
