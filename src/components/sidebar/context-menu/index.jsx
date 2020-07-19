import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { AiOutlineEllipsis as MenuIcon } from 'react-icons/ai';
import { createUseStyles } from 'react-jss';
import { useDispatch } from 'react-redux';

import { deleteParcours } from '../../../redux/actions';
import Tooltip from '../../commons/tooltip';
import Menu from './menu';

const useStyles = createUseStyles({
  container: {},
  tooltip: {},
});

const ContextButtonComponent = ({ id }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const onEdit = useCallback(() => {}, []);

  const onDelete = useCallback(() => dispatch(deleteParcours(id)), [
    dispatch,
    id,
  ]);

  return (
    <Tooltip
      useHover
      className={classes.tooltip}
      component={<Menu onDelete={onDelete} onEdit={onEdit} />}
      placement="right-start"
      theme="light">
      <div className={classes.menu}>
        <MenuIcon />
      </div>
    </Tooltip>
  );
};

ContextButtonComponent.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ContextButtonComponent;
