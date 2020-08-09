import PropTypes from 'prop-types';
import React from 'react';
import {
  MdAddCircle as PlusIcon,
  MdRemoveCircle as MoinsIcon,
} from 'react-icons/md';
import { createUseStyles } from 'react-jss';
import { Tooltip } from 'react-leaflet';

const useStyles = createUseStyles({
  tooltip: {
    '& > span': { display: 'block' },
    '&::before': {
      borderRightColor: 'transparent !important',
    },
    background: 'transparent',
    border: 0,
    boxShadow: 'none',
    color: '#000000',
    fontSize: '1.3em',
  },
});

const EditTooltipComponent = React.memo(({ remove }) => {
  const classes = useStyles();
  return (
    <Tooltip
      sticky
      className={classes.tooltip}
      direction="right"
      offset={[0, 16]}>
      {remove && <MoinsIcon />}
      {!remove && <PlusIcon />}
    </Tooltip>
  );
});

EditTooltipComponent.defaultProps = {
  remove: false,
};

EditTooltipComponent.propTypes = {
  remove: PropTypes.bool,
};

export default EditTooltipComponent;
