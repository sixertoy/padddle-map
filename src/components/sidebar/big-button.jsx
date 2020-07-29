import Tippy from '@tippyjs/react';
import React, { useCallback } from 'react';
import { IoIosAdd as PlusIcon } from 'react-icons/io';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import { createDraft } from '../../redux/actions';

const useStyles = createUseStyles({
  button: {
    '&:disabled': {
      background: '#CCC',
    },
    background: '#FFFFFF',
    borderRadius: '50%',
    fontSize: '2.7rem',
    height: 60,
    lineHeight: 0,
    outline: 'none',
    width: 60,
  },
});

const BigButtonComponent = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const editMode = useSelector(_ => _.editmode);

  const onclick = useCallback(() => {
    dispatch(createDraft());
  }, [dispatch]);

  return (
    <Tippy content="Ajouter un parcours" placement="left">
      <button
        className={classes.button}
        disabled={editMode}
        type="button"
        onClick={onclick}>
        <PlusIcon />
      </button>
    </Tippy>
  );
};

BigButtonComponent.defaultProps = {};

BigButtonComponent.propTypes = {};

export default BigButtonComponent;
