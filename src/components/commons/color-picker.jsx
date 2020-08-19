import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import { GithubPicker } from 'react-color';
import { createUseStyles } from 'react-jss';

import { ReactComponent as SVG } from '../../assets/activity-paddle.svg';
import { ZINDEX } from '../../constants';

const COLORS = ['#008000', '#00008C', '#FF0000', '#670069'];

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
    top: -46,
    zIndex: ZINDEX.PICKER,
  },
});

const ColorPickerComponent = React.memo(function ColorPickerComponent({
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
      onChange(hex);
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
