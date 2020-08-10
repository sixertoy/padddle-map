import PropTypes from 'prop-types';
import React from 'react';
import { createUseStyles } from 'react-jss';

import { ZINDEX } from '../../constants';
import Context from './context';
import Controls from './controls';

const useStyles = createUseStyles({
  context: {
    bottom: 0,
    composes: ['is-absolute'],
  },
  sidebar: {
    bottom: 32,
    composes: ['is-absolute'],
    right: 12,
    zIndex: ZINDEX.SIDEBAR,
  },
  wrapper: {
    composes: ['is-relative', 'flex-rows', 'items-end'],
  },
});

const SidebarComponent = ({ map }) => {
  const classes = useStyles();
  return (
    <div className={classes.sidebar}>
      <div className={classes.wrapper}>
        <Controls map={map} />
        <Context />
      </div>
    </div>
  );
};

SidebarComponent.propTypes = {
  map: PropTypes.shape().isRequired,
};

export default SidebarComponent;
