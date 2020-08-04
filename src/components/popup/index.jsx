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

const ParcoursPopupComponent = ({ data }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const user = useSelector(_ => _.user);
  const createmode = useSelector(_ => _.createmode);

  const [name, setName] = useState(data.name);

  const isowner = data.user === user.uid;

  const nameHandler = useCallback(
    ({ target }) => {
      setName(target.value);
      const next = { ...data, name };
      if (createmode) dispatch(updateDraft(next));
      if (!createmode) dispatch(updateParcours(next));
    },
    [createmode, data, dispatch, name]
  );

  const closeHandler = useCallback(() => {
    dispatch(closePopup());
  }, [dispatch]);

  const deleteHandler = useCallback(() => {
    if (createmode) dispatch(cancelDraft());
    if (!createmode) dispatch(deleteParcours(data.id));
    dispatch(closePopup());
  }, [createmode, data.id, dispatch]);

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
  //   ? getDistance(data.distance)
  //   : getDistance(distanceCalculation(data.points));

  return (
    <div className={classes.infopopup}>
      <div className={classes.wrapper}>
        <button className={classes.close} type="button" onClick={closeHandler}>
          <CloseIcon />
        </button>
        <div className={classes.header}>
          <Picker
            color={data.color || '#D94865'}
            disabled={!isowner}
            onChange={colorHandler}
          />
          <input
            className={classes.title}
            readOnly={!isowner}
            type="text"
            value={name}
            onChange={nameHandler}
          />
        </div>
        <div>
          <div>
            <span>{getDistance(data.distance)} km</span>
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
  data: PropTypes.shape().isRequired,
};

export default ParcoursPopupComponent;
