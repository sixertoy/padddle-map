import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import { GithubPicker } from 'react-color';
import { createUseStyles } from 'react-jss';

import { ReactComponent as SVG } from '../../assets/activity-paddle.svg';
import { PICKER_COLORS, ZINDEX } from '../../constants';

const useStyles = createUseStyles({
  colorPicker: {
    composes: ['is-relative'],
  },
  colorPickerButton: ({ size }) => ({
    borderRadius: size / 2,
    composes: ['no-overflow', 'is-block', 'no-outline'],
    height: size,
    width: size,
  }),
  colorPickerPopover: {
    composes: ['is-absolute'],
    left: -6,
    top: -52,
    zIndex: ZINDEX.PICKER,
  },
});

const ColorPickerComponent = function ColorPickerComponent({
  disabled,
  onChange,
  size,
  value,
}) {
  const classes = useStyles({ size });

  const [visibility, setVisibility] = useState(false);

  const openHandler = useCallback(() => {
    setVisibility(!visibility);
  }, [visibility]);

  const changeHandler = useCallback(
    ({ hex }) => {
      const next = hex.toUpperCase();
      onChange(next);
      setVisibility(false);
    },
    [onChange]
  );

  return (
    <div className={classes.colorPicker}>
      <button
        className={classes.colorPickerButton}
        disabled={disabled}
        type="button"
        onClick={openHandler}>
        <SVG style={{ color: value }} />
      </button>
      {visibility && (
        <div className={classes.colorPickerPopover}>
          <GithubPicker
            colors={PICKER_COLORS}
            triangle="bottom-left"
            width={112}
            onChange={changeHandler}
          />
        </div>
      )}
    </div>
  );
};

ColorPickerComponent.defaultProps = {
  size: 24,
};

ColorPickerComponent.propTypes = {
  disabled: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  size: PropTypes.number,
  value: PropTypes.string.isRequired,
};

export default ColorPickerComponent;
