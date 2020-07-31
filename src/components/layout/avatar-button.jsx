import get from 'lodash.get';
import React from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import Tooltip from '../commons/tooltip';
import MyAccount from './my-account';

const useStyles = createUseStyles({
  button: {
    '& .icon': {
      color: '#E61E4D',
      marginLeft: 8,
      marginRight: 8,
    },
    '& img': {
      borderRadius: '50%',
      composes: ['is-block'],
      height: 32,
      marginLeft: 8,
      width: 32,
    },
    border: '1px solid #EDEDED',
    borderRadius: 20,
    composes: [
      'is-block',
      'fs16',
      'p5',
      'no-overflow',
      'flex-columns',
      'items-center',
    ],
    height: 42,
    paddingLeft: '16px !important',
  },
  name: {
    fontSize: '0.8em',
    fontWeight: 600,
    whiteSpace: 'nowrap',
  },
});

const AvatarComponent = React.memo(() => {
  const classes = useStyles();
  const user = useSelector(_ => _.user);
  const name = get(user, 'name', null);
  const photoURL = get(user, 'photoURL', null);
  return (
    <Tooltip
      arrow={false}
      component={<MyAccount user={user} />}
      offset={[0, 12]}
      placement="bottom-end"
      theme="light"
      useHover={false}>
      <button className={classes.button} type="button">
        <span className={classes.name}>{name}</span>
        <img alt="user avatar" src={photoURL} />
      </button>
    </Tooltip>
  );
});

export default AvatarComponent;
