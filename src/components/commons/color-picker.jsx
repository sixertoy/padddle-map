import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import { GithubPicker } from 'react-color';
import { createUseStyles } from 'react-jss';

const COLORS = [
  '#B80000',
  '#DB3E00',
  '#FCCB00',
  '#008B02',
  '#006B76',
  '#1273DE',
  '#004DCF',
  '#5300EB',
  // '#EB9694',
  // '#FAD0C3',
  // '#FEF3BD',
  // '#C1E1C5',
  // '#BEDADC',
  // '#C4DEF6',
  // '#BED3F3',
  // '#D4C4FB',
];

const useStyles = createUseStyles({
  button: {
    borderRadius: 9,
    composes: ['no-overflow', 'is-block', 'no-outline'],
    height: 18,
    width: 18,
  },
  container: {},
  cover: {
    bottom: 0,
    composes: ['is-fixed'],
    left: 0,
    right: 0,
    top: 0,
  },
  popover: {
    composes: ['is-absolute'],
    left: 12,
    top: 42,
  },
});

const ColorPickerComponent = ({ color, onChange }) => {
  const classes = useStyles();
  const [visibility, setVisibility] = useState(false);

  const openHandler = useCallback(() => {
    setVisibility(true);
  }, []);

  const changeHandler = useCallback(
    picked => {
      setVisibility(false);
      onChange(picked.hex);
    },
    [onChange]
  );

  return (
    <div className={classes.container}>
      <button
        className={classes.button}
        style={{ backgroundColor: color }}
        type="button"
        onClick={openHandler}>
        <span />
      </button>
      {visibility && (
        <div className={classes.popover}>
          <GithubPicker colors={COLORS} width={112} onChange={changeHandler} />
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
