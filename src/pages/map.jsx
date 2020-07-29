import React, { createRef } from 'react';
import { createUseStyles } from 'react-jss';

import Header from '../components/layout/header';
import Map from '../components/map';
import Sidebar from '../components/sidebar';

const useStyles = createUseStyles({
  container: {
    background: '#90CCCB',
    composes: ['is-relative'],
  },
});

const MapPageComponent = () => {
  const map = createRef();
  const classes = useStyles();

  return (
    <div classes={classes.container} id="app-container">
      <Header />
      <Sidebar map={map} />
      <Map ref={map} />
    </div>
  );
};

export default MapPageComponent;
