import Tippy from '@tippyjs/react';
import React, { useCallback } from 'react';
import { IoMdCloudUpload as ImportIcon } from 'react-icons/io';
import { createUseStyles } from 'react-jss';
import { useDispatch } from 'react-redux';

import { cancelDraft, importParcours } from '../../redux/actions';

const useStyles = createUseStyles({
  button: {
    '&:hover': {
      background: '#FF5850',
      color: '#FFFFFF',
    },
    background: '#FFFFFF',
    borderRadius: '50%',
    composes: ['mb7', 'fs18'],
    height: 40,
    lineHeight: 0,
    outline: 'none',
    transition: 'all 0.3s',
    width: 40,
  },
});

// eslint-disable-next-line
const ExportButtonComponent = () => {
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
          dispatch(cancelDraft());
        };
        // reader.onabort = () => {}
        // reader.onerror = () => {}
        // reader.onloadend = () => {}
        // reader.onloadstart = () => {}
        reader.readAsText(file);
      } catch (error) {
        // eslint-disable-next-line
        console.erro(error);
      }
    },
    [dispatch]
  );

  return (
    <Tippy content="Import" placement="left">
      <button className={classes.button} type="button">
        <label htmlFor="uploader">
          <ImportIcon className={classes.icon} />
        </label>
        <input
          accept=".json,application/json"
          className="is-hidden"
          id="uploader"
          name="uploader"
          type="file"
          onChange={onUploadChange}
        />
      </button>
    </Tippy>
  );
};

export default ExportButtonComponent;
