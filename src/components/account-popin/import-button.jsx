import classnames from 'classnames';
import get from 'lodash.get';
import React, { useCallback, useRef, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useDispatch } from 'react-redux';

import { GPXToLatLng } from '../../core/leaflet';
import { importParcours } from '../../redux/actions';

const useStyles = createUseStyles({
  button: {
    '&.loading': {},
    '&:hover': {
      background: '#FF594F',
      color: '#FFFFFF',
    },
    border: '1px solid #FF594F',
    borderRadius: 8,
    color: '#FF594F',
    composes: [
      'is-block',
      'p12',
      'mb12',
      'no-background',
      'fs14',
      'flex-columns',
      'flex-center',
      'items-center',
    ],
    transition: 'all 0.3s',
    width: '100%',
  },
});

const ExportButtonComponent = function ExportButtonComponent() {
  const upload = useRef();
  const classes = useStyles();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const errorHandler = useCallback(err => {
    setLoading(false);
    // eslint-disable-next-line
    console.log('err', err);
  }, []);

  const loadEndHandler = useCallback(() => {
    setLoading(false);
  }, []);

  const loadStartHandler = useCallback(() => {
    setLoading(true);
  }, []);

  const onAbort = useCallback(() => {
    setLoading(false);
  }, []);

  const onLoad = useCallback(
    ({ target }) => {
      const xml = get(target, 'result', null);
      const data = GPXToLatLng(xml);
      if (data) {
        dispatch(importParcours(data));
      } else {
        errorHandler(new Error('Unable to import'));
      }
    },
    [dispatch, errorHandler]
  );

  const uploadHandler = useCallback(
    evt => {
      evt.preventDefault();
      try {
        const [file] = evt.target.files;
        const reader = new FileReader();
        reader.onload = onLoad;
        reader.onabort = onAbort;
        reader.onerror = errorHandler;
        reader.onloadend = loadEndHandler;
        reader.onloadstart = loadStartHandler;
        reader.readAsText(file);
      } catch (error) {
        errorHandler(error);
      }
    },
    [errorHandler, loadEndHandler, loadStartHandler, onAbort, onLoad]
  );

  return (
    <button className={classnames(classes.button, { loading })} type="button">
      <label htmlFor="uploader">
        <span>Importer un parcours</span>
      </label>
      <input
        ref={upload}
        accept=".gpx,application/xml"
        className="is-hidden"
        id="uploader"
        name="uploader"
        type="file"
        onChange={uploadHandler}
      />
    </button>
  );
};

export default ExportButtonComponent;
