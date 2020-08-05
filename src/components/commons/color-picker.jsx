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
  '#800082',
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
  picker: {
    composes: ['is-relative'],
  },
  pickerButton: {
    border: '3px solid #FFFFFF',
    borderRadius: 12,
    composes: ['no-overflow', 'is-block', 'no-outline'],
    height: 24,
    width: 24,
  },
  pickerPopover: {
    composes: ['is-absolute'],
    left: -82,
    top: 32,
  },
});

const ColorPickerComponent = React.memo(({ disabled, onChange, value }) => {
  const classes = useStyles();

  const [visibility, setVisibility] = useState(false);

  const openHandler = useCallback(() => {
    setVisibility(!visibility);
  }, [visibility]);

  const blurHandler = useCallback(() => {
    if (!visibility) return;
    setTimeout(() => setVisibility(false), 100);
  }, [visibility]);

  const changeHandler = useCallback(
    ({ hex }) => {
      onChange(hex);
      setVisibility(false);
    },
    [onChange]
  );

  return (
    <div className={classes.picker}>
      <button
        className={classes.pickerButton}
        disabled={disabled}
        style={{ backgroundColor: value }}
        type="button"
        onBlur={blurHandler}
        onClick={openHandler}>
        <span />
      </button>
      {visibility && (
        <div className={classes.pickerPopover}>
          <GithubPicker
            colors={COLORS}
            triangle="top-right"
            width={112}
            onChange={changeHandler}
          />
        </div>
      )}
    </div>
  );
});

ColorPickerComponent.propTypes = {
  disabled: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default ColorPickerComponent;
