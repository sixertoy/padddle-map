import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';

import { db } from '../core/firebase';
import { loadedParcours, openSelected } from '../redux/actions';

const useStyles = createUseStyles({
  container: {
    background: '#90CCCB',
    composes: ['is-relative'],
  },
});

const SharePageComponent = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { id } = useParams();

  const [loaded, setLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [redirectTo, setRedirectTo] = useState(null);

  const parcours = useSelector(_ => _.parcours);

  useEffect(() => {
    if (!loaded && !mounted && id) {
      setMounted(true);
      db.all('parcours').then(results => {
        dispatch(loadedParcours(results));
        dispatch(openSelected(id));
        setLoaded(true);
      });
    }
  }, [dispatch, id, loaded, mounted]);

  useEffect(() => {
    if (loaded) {
      const { coordinates } = parcours.find(obj => obj.id === id);
      const next = `/${coordinates.lat},${coordinates.lng},12`;
      setRedirectTo(next);
    }
  }, [id, loaded, parcours]);

  return (
    <div classes={classes.container} id="app-container">
      {redirectTo && <Redirect to={redirectTo} />}
    </div>
  );
};

export default SharePageComponent;
