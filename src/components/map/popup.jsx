import PropTypes from 'prop-types';
import React, { useCallback, useRef } from 'react';
import { GiPathDistance as DistanceIcon } from 'react-icons/gi';
import {
  IoMdDownload as ExportIcon,
  IoMdSave as SaveIcon,
  IoMdTrash as DeleteIcon,
} from 'react-icons/io';
import { createUseStyles } from 'react-jss';
import { Popup } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';

import { distanceCalculation, getDistance } from '../../core';
import {
  cancelDraft,
  commitDraft,
  deleteParcours,
  updateDraft,
  updateParcours,
} from '../../redux/actions';
import Picker from '../commons/color-picker';

const useStyles = createUseStyles({
  button: {
    '& .icon': {
      marginLeft: 3,
    },
    background: 'transparent',
    border: '1px solid #CCC',
    borderRadius: 4,
    composes: ['px12', 'py7', 'flex-columns', 'flex-center', 'items-center'],
  },
  container: {
    paddingBottom: 3,
  },
  controls: {
    composes: ['mt12', 'flex-columns', 'items-center', 'flex-end'],
  },
  distance: {},
  header: {
    composes: ['mb7'],
  },
  infos: {
    composes: ['flex-columns', 'flex-between', 'items-center'],
    fontSize: '1.2rem',
  },
  title: {
    '&:focus': {
      background: 'rgba(0, 0, 0, 0.07)',
      paddingLeft: 7,
    },
    borderRadius: 4,
    composes: ['py7', 'pr7', 'is-bold'],
    fontSize: '1.4rem',
    transition: 'all 0.3s',
    width: '100%',
  },
});

const PopupComponent = ({ data, isDraft }) => {
  const popup = useRef();
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(_ => _.user);

  const nameHandler = useCallback(
    ({ target }) => {
      const name = target.value;
      const next = { ...data, name };
      if (isDraft) dispatch(updateDraft(next));
      if (!isDraft) dispatch(updateParcours(next));
    },
    [data, dispatch, isDraft]
  );

  const deleteHandler = useCallback(() => {
    if (isDraft) dispatch(cancelDraft());
    if (!isDraft) dispatch(deleteParcours(data.id));
  }, [data.id, dispatch, isDraft]);

  const colorHandler = useCallback(
    color => {
      const next = { ...data, color };
      if (isDraft) dispatch(updateDraft(next));
      if (!isDraft) dispatch(updateParcours(next));
    },
    [data, dispatch, isDraft]
  );

  const commitHandler = useCallback(() => {
    const { uid } = user;
    dispatch(commitDraft({ ...data, user: uid }));
  }, [data, dispatch, user]);

  const exportHandler = useCallback(() => {}, []);

  const distance = !isDraft
    ? getDistance(data.distance)
    : getDistance(distanceCalculation(data.points));
  const isOwner = data.user === user.uid;

  return (
    <Popup
      ref={popup}
      autoPan={false}
      className={classes.popup}
      closeButton={!isDraft}
      closeOnClick={!isDraft}
      permanent={isDraft}
      position={isDraft ? data.points[0] : null}>
      <div className={classes.container}>
        <div className={classes.header}>
          <input
            className={classes.title}
            defaultValue={data.name}
            readOnly={!isOwner}
            type="text"
            onChange={nameHandler}
          />
        </div>
        <div className={classes.infos}>
          <div className={classes.distance}>
            <DistanceIcon />
            <span>{`${distance} Km`}</span>
          </div>
          <Picker
            color={data.color || '#D94865'}
            disabled={!isOwner}
            onChange={colorHandler}
          />
        </div>
        <div className={classes.controls}>
          {!isDraft && (
            <button
              className={classes.button}
              type="button"
              onClick={exportHandler}>
              <span>GPX</span>
              <ExportIcon className="icon" />
            </button>
          )}
          {isDraft && (
            <React.Fragment>
              <button
                className={classes.button}
                type="button"
                onClick={commitHandler}>
                <span>Enregistrer</span>
                <SaveIcon className="icon" />
              </button>
            </React.Fragment>
          )}
          {!isDraft && isOwner && (
            <button
              className={classes.button}
              type="button"
              onClick={deleteHandler}>
              <span>Supp.</span>
              <DeleteIcon className="icon" />
            </button>
          )}
        </div>
      </div>
    </Popup>
  );
};

PopupComponent.defaultProps = {
  isDraft: false,
};

PopupComponent.propTypes = {
  data: PropTypes.shape({
    color: PropTypes.string,
    distance: PropTypes.number,
    id: PropTypes.string,
    name: PropTypes.string,
    points: PropTypes.arrayOf(PropTypes.shape()),
    polygon: PropTypes.bool,
    user: PropTypes.string,
  }).isRequired,
  isDraft: PropTypes.bool,
};

export default PopupComponent;
