import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import { GithubPicker } from 'react-color';
import { createUseStyles } from 'react-jss';

import { ReactComponent as SVG } from '../../assets/activity-paddle.svg';
import { ZINDEX } from '../../constants';

const COLORS = ['#008000', '#00008C', '#FF0000', '#670069'];

const useStyles = createUseStyles({
  picker: {
    composes: ['is-relative'],
  },
  pickerButton: {
    borderRadius: 12,
    composes: ['no-overflow', 'is-block', 'no-outline'],
    height: 24,
    width: 24,
  },
  pickerPopover: {
    composes: ['is-absolute'],
    left: -6,
    top: -46,
    zIndex: ZINDEX.PICKER,
  },
});

const ColorPickerComponent = React.memo(({ disabled, onChange, value }) => {
  const classes = useStyles();

  const [visibility, setVisibility] = useState(false);

  const openHandler = useCallback(() => {
    setVisibility(!visibility);
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
        type="button"
        onClick={openHandler}>
        <SVG style={{ color: value }} />
      </button>
      {visibility && (
        <div className={classes.pickerPopover}>
          <GithubPicker
            colors={COLORS}
            triangle="bottom-left"
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
