import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';
import {
  IoMdClose as CloseIcon,
  IoMdDownload as ExportIcon,
  IoMdSave as SaveIcon,
  IoMdTrash as DeleteIcon,
} from 'react-icons/io';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import { ZINDEX } from '../../constants';
import { getDistance } from '../../core';
import {
  cancelDraft,
  closePopup,
  // commitDraft,
  deleteParcours,
  updateDraft,
  updateParcours,
} from '../../redux/actions';
import Picker from '../commons/color-picker';

const useStyles = createUseStyles({
  close: {
    composes: ['is-absolute'],
    right: 0,
    top: 0,
  },
  infopopup: {
    composes: ['is-absolute'],
    left: 12,
    top: 72,
    zIndex: ZINDEX.POPUP,
  },
  title: {
    composes: ['is-bold', 'fs24'],
  },
  wrapper: {
    background: '#FFFFFF',
    borderRadius: 10,
    composes: ['is-relative'],
    height: 200,
    width: 200,
  },
});

const ParcoursPopupComponent = ({ id }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const user = useSelector(_ => _.user);
  const createmode = useSelector(_ => _.createmode);
  const selected = useSelector(_ => _.parcours.find(obj => obj.id === id));

  const isowner = selected.user === user.uid;

  const nameHandler = useCallback(
    ({ target }) => {
      const name = target.value;
      const next = { ...selected, name };
      console.log('next', next);
      if (createmode) dispatch(updateDraft(next));
      if (!createmode) dispatch(updateParcours(next));
    },
    [createmode, dispatch, selected]
  );

  const closeHandler = useCallback(() => {
    dispatch(closePopup());
  }, [dispatch]);

  const deleteHandler = useCallback(() => {
    if (createmode) dispatch(cancelDraft());
    if (!createmode) dispatch(deleteParcours(selected.id));
    dispatch(closePopup());
  }, [createmode, dispatch, selected.id]);

  const commitHandler = useCallback(() => {
    // const { uid } = user;
    // console.log('data', data);
    // dispatch(commitDraft({ ...data, user: uid }));
  }, []);

  const colorHandler = useCallback(() => {
    // const next = { ...data, color };
    // if (isDraft) dispatch(updateDraft(next));
    // if (!isDraft) dispatch(updateParcours(next));
  }, []);

  const exportHandler = useCallback(() => {}, []);

  // const distance = !isDraft
  //   ? getDistance(selected.distance)
  //   : getDistance(distanceCalculation(selected.points));

  return (
    <div className={classes.infopopup}>
      <div className={classes.wrapper}>
        <button className={classes.close} type="button" onClick={closeHandler}>
          <CloseIcon />
        </button>
        <div className={classes.header}>
          <Picker
            color={selected.color || '#D94865'}
            disabled={!isowner}
            onChange={colorHandler}
          />
          <input
            className={classes.title}
            defaultValue={selected.name}
            readOnly={!isowner}
            type="text"
            onChange={nameHandler}
          />
        </div>
        <div>
          <div>
            <span>{getDistance(selected.distance)}&nbsp;km</span>
          </div>
        </div>
        <div className={classes.buttons}>
          <button type="button" onClick={exportHandler}>
            <ExportIcon />
          </button>
          <button type="button" onClick={commitHandler}>
            <SaveIcon />
          </button>
          {isowner && (
            <button type="button" onClick={deleteHandler}>
              <DeleteIcon />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

ParcoursPopupComponent.defaultProps = {};

ParcoursPopupComponent.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ParcoursPopupComponent;
