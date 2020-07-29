import PropTypes from 'prop-types';
import React, { useCallback, useRef } from 'react';
import { IoMdSave as SaveIcon, IoMdTrash as DeleteIcon } from 'react-icons/io';
import { createUseStyles } from 'react-jss';
import { Popup } from 'react-leaflet';
import { useDispatch } from 'react-redux';

import { getDistance } from '../../core';
import { deleteParcours, updateParcours } from '../../redux/actions';
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
  const distance = getDistance(data.distance);

  const commitHandler = useCallback(() => {
    popup.current.leafletElement.closePopup();
    // dispatch(deleteParcours(data));
  }, []);

  const deleteHandler = useCallback(() => {
    popup.current.leafletElement.closePopup();
    dispatch(deleteParcours(data.id));
  }, [data.id, dispatch]);

  const colorHandler = useCallback(
    color => {
      const next = { ...data, color };
      dispatch(updateParcours(next));
    },
    [data, dispatch]
  );

  return (
    <Popup
      ref={popup}
      className={classes.tooltip}
      direction="top"
      offset={[0, -7]}
      permanent={isDraft}>
      <div>
        <div className={classes.header}>
          <Picker color={data.color || '#D94865'} onChange={colorHandler} />
          <h1 className={classes.title}>
            <span>{data.name}</span>
          </h1>
        </div>
        <div className="is-block">
          <span>{`${distance} Km`}</span>
        </div>
        {!isDraft && (
          <button className="" type="button" onClick={deleteHandler}>
            <DeleteIcon />
          </button>
        )}
        {isDraft && (
          <React.Fragment>
            <button className="" type="button" onClick={commitHandler}>
              <SaveIcon />
            </button>
          </React.Fragment>
        )}
      </div>
    </Popup>
  );
};

PopupComponent.defaultProps = {
  permanent: false,
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
  permanent: PropTypes.bool,
};

export default PopupComponent;
