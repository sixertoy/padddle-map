import React from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import { selectParcours } from '../../redux/selectors';
import Blank from './blank';
import Parcours from './parcours';

const useStyles = createUseStyles({
  container: {
    composes: ['is-absolute'],
    left: 24,
    top: 24,
    zIndex: 99999,
  },
  list: {},
});

const MenuComponent = () => {
  const classes = useStyles();
  const parcours = useSelector(selectParcours);
  return (
    <div className={classes.container}>
      <Blank />
      <div className={classes.list}>
        {parcours &&
          parcours.length > 0 &&
          parcours.map(obj => <Parcours key={obj.id} data={obj} />)}
      </div>
    </div>
  );
};

MenuComponent.propTypes = {};

export default MenuComponent;
