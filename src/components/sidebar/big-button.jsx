import React, { useCallback } from 'react';
import { AiTwotoneSave as SaveIcon } from 'react-icons/ai';
import { IoIosAdd as PlusIcon } from 'react-icons/io';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import { commitDraft, createDraft } from '../../redux/actions';
import { selectDraft, selectEditMode } from '../../redux/selectors';

const useStyles = createUseStyles({
  button: {
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
  const draft = useSelector(selectDraft);
  const editmode = useSelector(selectEditMode);

  const onclick = useCallback(() => {
    if (editmode) {
      const hasPoints = draft && draft.length > 1;
      if (hasPoints) dispatch(commitDraft(draft));
    } else {
      dispatch(createDraft());
    }
  }, [dispatch, draft, editmode]);

  return (
    <button className={classes.button} type="button" onClick={onclick}>
      {!editmode && <PlusIcon />}
      {editmode && <SaveIcon />}
    </button>
  );
};

BigButtonComponent.defaultProps = {};

BigButtonComponent.propTypes = {};

export default BigButtonComponent;
