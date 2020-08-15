import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import { DEBUG_MODE, ZINDEX } from '../../constants';
import { IfFirebaseAuthed } from '../../core/firebase';
import { isOwner } from '../../helpers';
import { selectParcours } from '../../redux/selectors';
import BigButton from './big-button';
import CommitButton from './commit-button';
import EditButton from './edit-button';
import ExportButton from './export-button';
import GeoLocateButton from './geolocate-button';
import ImportButton from './import-button';
import ShareButton from './share-button';

const useStyles = createUseStyles({
  controls: {
    composes: ['flex-rows', 'items-center'],
    width: 60,
  },
  sidebar: {
    bottom: 32,
    composes: ['is-absolute'],
    right: 12,
    transition: 'bottom 0.3s',
    zIndex: ZINDEX.SIDEBAR,
  },
  wrapper: {
    composes: ['is-relative', 'flex-rows', 'items-end'],
  },
  [`@media (max-width: ${680}px)`]: {
    sidebar: {
      '&.opened': { bottom: '62px !important' },
      bottom: '12px !important',
    },
  },
});

const SidebarComponent = ({ map }) => {
  const classes = useStyles();

  const [mounted, setMounted] = useState(false);

  const selected = useSelector(selectParcours);
  const createmode = useSelector(_ => _.createmode);

  const geolocateHandler = useCallback(
    point => {
      const lmap = map.current.leafletElement;
      const zoom = lmap.getZoom() < 12 ? 12 : lmap.getZoom();
      lmap.setView(point, zoom);
    },
    [map]
  );

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
    }
  }, [mounted]);

  return (
    <div className={classnames(classes.sidebar, { opened: !!selected })}>
      <div className={classes.wrapper}>
        <div className={classnames(classes.controls, { mounted })}>
          {DEBUG_MODE && (
            <React.Fragment>
              <ExportButton />
              <ImportButton />
            </React.Fragment>
          )}
          <ShareButton />
          <GeoLocateButton onGeoLocate={geolocateHandler} />
          <IfFirebaseAuthed>
            {({ user }) => {
              const isowner = isOwner(selected, user);
              const showcommitbutton = createmode;
              const showeditbutton = selected && isowner && !createmode;
              const showbigbutton = !showcommitbutton && !showeditbutton;
              return (
                <React.Fragment>
                  {showeditbutton && <EditButton />}
                  {showcommitbutton && <CommitButton />}
                  {showbigbutton && <BigButton user={user} />}
                </React.Fragment>
              );
            }}
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
