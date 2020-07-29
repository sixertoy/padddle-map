import PropTypes from 'prop-types';
import React, { useCallback, useRef } from 'react';
import { IoMdSave as SaveIcon, IoMdTrash as DeleteIcon } from 'react-icons/io';
import { createUseStyles } from 'react-jss';
import { Popup } from 'react-leaflet';
import { useDispatch } from 'react-redux';

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
  header: {
    composes: ['flex-columns', 'flex-start', 'items-center'],
  },
  title: {
    composes: ['is-bold', 'm0', 'pl7', 'text-left'],
    fontSize: '1.4rem',
  },
  tooltip: {
    width: 200,
  },
});

const PopupComponent = ({ data, isDraft }) => {
  const popup = useRef();
  const classes = useStyles();
  const dispatch = useDispatch();

  const commitHandler = useCallback(() => {
    dispatch(commitDraft(data));
  }, [data, dispatch]);

  const deleteHandler = useCallback(() => {
    if (isDraft) dispatch(cancelDraft());
    if (!isDraft) dispatch(deleteParcours(data.id));
  }, [data.id, dispatch, isDraft]);

  const nameHandler = useCallback(
    ({ target }) => {
      const name = target.value;
      const next = { ...data, name };
      if (isDraft) dispatch(updateDraft(next));
      if (!isDraft) dispatch(updateParcours(next));
    },
    [data, dispatch, isDraft]
  );

  const colorHandler = useCallback(
    color => {
      const next = { ...data, color };
      if (isDraft) dispatch(updateDraft(next));
      if (!isDraft) dispatch(updateParcours(next));
    },
    [data, dispatch, isDraft]
  );

  const distance = !isDraft
    ? getDistance(data.distance)
    : getDistance(distanceCalculation(data.points));

  return (
    <Popup
      ref={popup}
      className={classes.tooltip}
      closeButton={!isDraft}
      closeOnClick={!isDraft}
      direction="top"
      offset={[0, -7]}
      permanent={isDraft}
      position={isDraft ? data.points[0] : null}>
      <div>
        <div className={classes.header}>
          <Picker color={data.color || '#D94865'} onChange={colorHandler} />
          <input
            className={classes.title}
            defaultValue={data.name}
            type="text"
            onChange={nameHandler}
          />
        </div>
        <div className="is-block">
          <span>{`${distance} Km`}</span>
        </div>
        <button type="button" onClick={deleteHandler}>
          <DeleteIcon />
        </button>
        {isDraft && (
          <React.Fragment>
            <button type="button" onClick={commitHandler}>
              <SaveIcon />
            </button>
          </React.Fragment>
        )}
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
  }).isRequired,
  isDraft: PropTypes.bool,
};

export default PopupComponent;
