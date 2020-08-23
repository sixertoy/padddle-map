import Tippy from '@tippyjs/react';
import React, { useCallback, useRef } from 'react';
import { IoMdCloudUpload as ImportIcon } from 'react-icons/io';
import { createUseStyles } from 'react-jss';
import { useDispatch } from 'react-redux';

import { importParcours } from '../../redux/actions';

const useStyles = createUseStyles({
  button: {
    '&:hover': {
      background: '#FF5850',
      color: '#FFFFFF',
    },
    background: '#FFFFFF',
    borderRadius: '50%',
    composes: ['fs18', 'mb7'],
    height: 40,
    lineHeight: 0,
    outline: 'none',
    transition: 'all 0.3s',
    width: 40,
  },
});

const ExportButtonComponent = function ExportButtonComponent() {
  const upload = useRef();
  const classes = useStyles();
  const dispatch = useDispatch();

  const onUploadChange = useCallback(
    evt => {
      evt.preventDefault();
      try {
        const [file] = evt.target.files;
        const reader = new FileReader();
        reader.onload = ({ target }) => {
          dispatch(importParcours(target.result));
        };
        // reader.onabort = () => {}
        // reader.onerror = () => {}
        // reader.onloadend = () => {}
        // reader.onloadstart = () => {}
        reader.readAsText(file);
      } catch (error) {
        // eslint-disable-next-line
        console.error(error);
      }
    },
    [dispatch]
  );

  return (
    <React.Fragment>
      <Tippy content="Import" placement="left">
        <button className={classes.button} type="button">
          <label htmlFor="uploader">
            <ImportIcon className={classes.icon} />
          </label>
          <input
            ref={upload}
            accept=".gpx,application/xml"
            className="is-hidden"
            id="uploader"
            name="uploader"
            type="file"
            onChange={onUploadChange}
          />
        </button>
      </Tippy>
    </React.Fragment>
  );
};

export default ExportButtonComponent;
