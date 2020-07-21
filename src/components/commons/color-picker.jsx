import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import { GithubPicker } from 'react-color';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  button: {
    borderRadius: 12,
    composes: ['no-overflow'],
    height: 24,
    width: 24,
  },
  container: {},
  cover: {
    bottom: 0,
    composes: ['is-fixed'],
    left: 0,
    right: 0,
    top: 0,
  },
  dot: {
    height: 24,
    width: 24,
  },
  popover: {
    composes: ['is-absolute'],
  },
});

const ColorPickerComponent = ({ color, onChange }) => {
  const classes = useStyles();
  const [visibility, setVisibility] = useState(false);

  const openHandler = useCallback(() => {
    setVisibility(true);
  }, []);

  const changeHandler = useCallback(() => {
    setVisibility(false);
    // onChange()
  }, []);

  // const closeHandler = useCalback(() => {
  //   setVisibility(false);
  // }, []);

  return (
    <div className={classes.container}>
      <button className={classes.button} type="button" onClick={openHandler}>
        <span className={classes.dot} style={{ backgroundColor: color }} />
      </button>
      {visibility && (
        <div className={classes.popover}>
          <GithubPicker onChange={changeHandler} />
        </div>
      )}
    </div>
  );
};

ColorPickerComponent.propTypes = {
  color: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ColorPickerComponent;
