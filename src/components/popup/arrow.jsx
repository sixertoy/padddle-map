import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  arrow: {
    borderColor: 'transparent transparent #FFFFFF transparent',
    borderStyle: 'solid',
    borderWidth: '0 12px 12px 12px',
    composes: ['is-absolute'],
    height: 0,
    left: 'calc(50% - 6px)',
    marginLeft: 0,
    top: -12,
    width: 0,
  },
});

const PopupArrowComponent = () => {
  const classes = useStyles();
  return <div className={classes.arrow} />;
};

export default PopupArrowComponent;
