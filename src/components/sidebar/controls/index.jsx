import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import { IfFirebaseAuthed } from '../../../core/firebase';
import BigButton from './big-button';
import ExportButton from './export-button';
import GeoLocateButton from './geolocate-button';
import ImportButton from './import-button';
import ShareButton from './share-button';

const useStyles = createUseStyles({
  controls: {
    composes: ['flex-rows', 'items-center'],
  },
});

const ControlsComponent = ({ map }) => {
  const classes = useStyles();
  const createmode = useSelector(_ => _.createmode);

  const geolocateHandler = useCallback(
    point => {
      const lmap = map.current.leafletElement;
      const zoom = lmap.getZoom() < 12 ? 12 : lmap.getZoom();
      lmap.setView(point, zoom);
    },
    [map]
  );

  const useimport = false;
  const useexport = false;

  return (
    <div className={classes.controls}>
      {useexport && !createmode && <ExportButton />}
      {useimport && !createmode && <ImportButton />}
      <ShareButton />
      <GeoLocateButton onGeoLocate={geolocateHandler} />
      <IfFirebaseAuthed>
        {({ user }) => <BigButton user={user} />}
      </IfFirebaseAuthed>
    </div>
  );
};

ControlsComponent.propTypes = {
  map: PropTypes.shape().isRequired,
};

export default ControlsComponent;
