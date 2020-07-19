import PropTypes from 'prop-types';
import React from 'react';
import {
  AiFillDelete as DeleteIcon,
  AiFillEdit as EditIcon,
} from 'react-icons/ai';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  button: {
    marginLeft: 12,
    marginRight: 12,
  },
  container: {
    composes: ['flex-columns', 'flex-around'],
    width: 100,
  },
});

const ContextMenuComponent = ({ onDelete, onEdit }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <button className={classes.button} type="button" onClick={onEdit}>
        <EditIcon className={classes.icon} />
      </button>
      <button className={classes.button} type="button" onClick={onDelete}>
        <DeleteIcon className={classes.icon} />
      </button>
    </div>
  );
};

ContextMenuComponent.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default ContextMenuComponent;
