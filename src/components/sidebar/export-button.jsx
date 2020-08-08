import Tippy from '@tippyjs/react';
import React, { useCallback } from 'react';
import { IoMdDownload as ExportIcon } from 'react-icons/io';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  button: {
    '&:hover': {
      background: '#FF5850',
      color: '#FFFFFF',
    },
    background: '#FFFFFF',
    borderRadius: '50%',
    composes: ['mb7'],
    fontSize: '1.1rem',
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

  const exportHandler = useCallback(() => {}, []);

  return (
    <Tippy content="Export GPX" placement="left">
      <button
        disabled
        className={classes.button}
        type="button"
        onClick={exportHandler}>
        <ExportIcon />
      </button>
    </Tippy>
  );
};

export default ExportButtonComponent;
