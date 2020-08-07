import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import { ZINDEX } from '../../constants';
import { IfFirebaseAuthed } from '../../core/firebase';
import Popup from '../popup';
import BigButton from './big-button';
import GeoLocateButton from './geolocate-button';
import ShareButton from './share-button';

const useStyles = createUseStyles({
  controls: {
    composes: ['flex-rows', 'items-center'],
  },
  sidebar: {
    bottom: 32,
    composes: ['is-absolute'],
    right: 12,
    zIndex: ZINDEX.SIDEBAR,
  },
  wrapper: {
    composes: ['is-relative', 'flex-rows', 'items-end'],
  },
});

const SidebarComponent = ({ map }) => {
  const classes = useStyles();

  const selected = useSelector(_ => _.selected);
  const createmode = useSelector(_ => _.createmode);

  const geolocateHandler = useCallback(
    point => {
      const lmap = map.current.leafletElement;
      const zoom = lmap.getZoom() < 12 ? 12 : lmap.getZoom();
      lmap.setView(point, zoom);
    },
    [map]
  );

  return (
    <div className={classes.sidebar}>
      <div className={classes.wrapper}>
        {(createmode || selected) && <Popup />}
        <div className={classes.controls}>
          <ShareButton />
          <GeoLocateButton onGeoLocate={geolocateHandler} />
          <IfFirebaseAuthed>
            {({ user }) => <BigButton user={user} />}
          </IfFirebaseAuthed>
        </div>
      </div>
    </div>
  );
};

SidebarComponent.propTypes = {
  map: PropTypes.shape().isRequired,
};

export default SidebarComponent;
