import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
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
  closePopup,
  commitDraft,
  // updateDraft,
  // updateParcours,
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

  const isOwner = data.user === user.uid;
  const distance = getDistance(data.distance);

  const nameHandler = useCallback(({ target }) => {
    const name = target.value;
    console.log('name', name);
    // const next = { ...data, name };
    // if (isDraft) dispatch(updateDraft(next));
    // if (!isDraft) dispatch(updateParcours(next));
  }, []);

  const closeHandler = useCallback(() => {
    dispatch(closePopup());
  }, [dispatch]);

  const deleteHandler = useCallback(() => {
    // if (isDraft) dispatch(cancelDraft());
    // if (!isDraft) dispatch(deleteParcours(data.id));
  }, []);

  const commitHandler = useCallback(() => {
    const { uid } = user;
    console.log('data', data);
    // dispatch(commitDraft({ ...data, user: uid }));
  }, [data, user]);

  const colorHandler = useCallback(
    color => {
      const next = { ...data, color };
      // if (isDraft) dispatch(updateDraft(next));
      // if (!isDraft) dispatch(updateParcours(next));
    },
    [data]
  );

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
            disabled={!isOwner}
            onChange={colorHandler}
          />
          <input
            className={classes.title}
            readOnly={!isOwner}
            type="text"
            value={data.name}
            onChange={nameHandler}
          />
        </div>
        <div>
          <div>
            <span>{distance}</span>
          </div>
        </div>
        <div className={classes.buttons}>
          <button type="button" onClick={exportHandler}>
            <ExportIcon />
          </button>
          <button type="button" onClick={commitHandler}>
            <SaveIcon />
          </button>
          {isOwner && (
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
