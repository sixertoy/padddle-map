import React from 'react';
import { createUseStyles } from 'react-jss';
import { Link } from 'react-router-dom';

const useStyles = createUseStyles({
  button: {
    backgroundColor: '#000',
    borderRadius: 4,
    color: '#FFFFFF',
    composes: ['is-bold'],
    margin: 12,
    padding: '12px 24px',
    width: 120,
  },
  container: {
    color: '#FFFFFF',
    composes: ['flex-rows', 'flex-center', 'items-center'],
    padding: 35,
    position: 'relative',
  },
  controls: {
    composes: ['flex-columns', 'flex-center'],
    marginTop: 20,
  },
  disclaimer: {
    composes: ['is-bold'],
    marginTop: 36,
  },
  help: {
    fontSize: '0.85rem',
    marginTop: 20,
    opacity: 0.45,
  },
  message: {
    fontSize: '1.2rem',
    marginTop: 40,
  },
  paf: {
    composes: ['is-italic'],
    marginBottom: 12,
  },
  title: {
    composes: ['is-bold'],
  },
  wrapper: {
    textAlign: 'center',
  },
});

const LandingPageComponent = () => {
  const classes = useStyles();

  return (
    <div className={classes.container} id="welcome">
      <div className={classes.wrapper}>
        <h1 className={classes.title}>
          <span>Parcours Paddle</span>
        </h1>
        <div className={classes.message}>
          <p>
            <span>
              Souhaitez-vous utiliser la géolocalisation de votre téléphone ?
            </span>
          </p>
        </div>
        <div className={classes.controls}>
          <div>
            <Link
              className={classes.button}
              style={{ backgroundColor: '#73C990' }}
              to="/map">
              <span>Entrer</span>
            </Link>
          </div>
        </div>
        <div className={classes.help}>
          <p className={classes.paf}>
            <sup>*</sup>&nbsp;
            <span>
              La géolocation doit être activée dans les préférences de votre
              device
            </span>
          </p>
          <p className={classes.paf}>
            Utiliser la molette de votre souris pour zoomer/dézoomer sur la
            carte
          </p>
          <p className={classes.disclaimer}>
            Cette application ne stocke aucune de vos informations personnelles
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPageComponent;
