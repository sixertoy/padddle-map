import React from 'react';
import { createUseStyles } from 'react-jss';

import BigButton from './big-button';

const useStyles = createUseStyles({
  bigButton: {
    bottom: 40,
    composes: ['is-absolute'],
    height: 60,
    right: 12,
    width: 60,
    zIndex: 99999,
  },
  container: {},
});

const SidebarComponent = () => {
  const classes = useStyles();
  // const parcours = useSelector(selectParcours);
  // const hasParcours = parcours && parcours.length > 0;

  return (
    <div className={classes.container}>
      <div className={classes.bigButton}>
        <BigButton />
      </div>
      <div className={classes.locateButton} />
      {/* <div className={classes.list}>
        {(hasParcours &&
          orderBy(parcours, [order]).map(obj => (
            <Parcours key={obj.id} data={obj} />
          ))) ||
          null}
      </div> */}
    </div>
  );
};

SidebarComponent.propTypes = {};

export default SidebarComponent;
