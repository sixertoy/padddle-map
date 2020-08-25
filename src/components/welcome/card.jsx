import PropTypes from 'prop-types';
import React from 'react';
import { IoMdClose as CloseIcon } from 'react-icons/io';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  closebutton: {
    color: 'rgba(0, 0, 0, 0.25)',
    composes: ['is-absolute', 'text-center'],
    right: -12,
    top: -12,
  },
  welcomeCard: {
    background: '#FFFFFF',
    composes: ['text-center', 'is-relative', 'p12'],
    width: 320,
  },
});

const CardComponent = React.memo(function CardComponent({ onClose, onStart }) {
  const classes = useStyles();
  return (
    <div className={classes.welcomeCard}>
      <button className={classes.closebutton} type="button" onClick={onClose}>
        <CloseIcon />
      </button>
      <h1>Aloha !</h1>
      <div>
        Bienvenue sur padddl.io, une carte interactive qui se veut collaborative
        avant tout, c&apos;est vous qui créez, enrichie par la communauté, pour
        faire découvrir aux autres
      </div>
      <button type="button" onClick={onStart}>
        <span>Start</span>
      </button>
    </div>
  );
});

CardComponent.propTypes = {
  onClose: PropTypes.func.isRequired,
  onStart: PropTypes.func.isRequired,
};

export default CardComponent;
