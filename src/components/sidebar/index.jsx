import orderBy from 'lodash.orderby';
import React, { useCallback, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import { selectParcours } from '../../redux/selectors';
import Parcours from './parcours';
// import NameButton from './toolbar/alpha';
import BlankButton from './toolbar/blank';
import GeolocateButton from './toolbar/geolocate';
// import DistanceButton from './toolbar/distance';

const useStyles = createUseStyles({
  container: {
    composes: ['is-absolute'],
    left: 24,
    top: 24,
    width: 260,
    zIndex: 99999,
  },
  list: {},
  toolbar: {
    background: '#FFF',
    borderRadius: 4,
    composes: ['flex-columns', 'flex-between', 'items-center', 'fs24', 'p12'],
    marginBottom: 7,
  },
});

const SidebarComponent = () => {
  const classes = useStyles();
  const [order, setOrder] = useState('name');
  const parcours = useSelector(selectParcours);
  const hasParcours = parcours && parcours.length > 0;

  // const orderHandler = useCallback(orderby => setOrder(orderby), []);

  return (
    <div className={classes.container}>
      <div className={classes.toolbar}>
        <BlankButton />
        <GeolocateButton />
        {/* <NameButton onChange={orderHandler} /> */}
        {/* <DistanceButton onChange={orderHandler} /> */}
      </div>
      <div className={classes.list}>
        {(hasParcours &&
          orderBy(parcours, [order]).map(obj => (
            <Parcours key={obj.id} data={obj} />
          ))) ||
          null}
      </div>
    </div>
  );
};

SidebarComponent.propTypes = {};

export default SidebarComponent;
