import React, { useCallback, useState } from 'react';
import { GithubPicker } from 'react-color';
import { createUseStyles } from 'react-jss';
import { useDispatch, useSelector } from 'react-redux';

import { updateDraft, updateParcours } from '../../redux/actions';
import { selectParcours } from '../../redux/selectors';

const COLORS = [
  '#B80000',
  '#DB3E00',
  '#FCCB00',
  '#008B02',
  '#006B76',
  '#1273DE',
  '#004DCF',
  '#5300EB',
  // '#EB9694',
  // '#FAD0C3',
  // '#FEF3BD',
  // '#C1E1C5',
  // '#BEDADC',
  // '#C4DEF6',
  // '#BED3F3',
  // '#D4C4FB',
];

const useStyles = createUseStyles({
  button: {
    borderRadius: 9,
    composes: ['no-overflow', 'is-block', 'no-outline'],
    height: 18,
    width: 18,
  },
  container: {},
  cover: {
    bottom: 0,
    composes: ['is-fixed'],
    left: 0,
    right: 0,
    top: 0,
  },
  popover: {
    composes: ['is-absolute'],
    left: -9,
    top: 26,
  },
});

const ColorPickerComponent = React.memo(() => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [visibility, setVisibility] = useState(false);

  const user = useSelector(_ => _.user);
  const selected = useSelector(selectParcours);
  const createmode = useSelector(_ => _.createmode);

  const isowner = user.id === selected.id;

  const openHandler = useCallback(() => {
    setVisibility(true);
  }, []);

  const changeHandler = useCallback(
    picked => {
      setVisibility(false);
      const color = picked.hex;
      const next = { ...selected, color };
      if (createmode) dispatch(updateDraft(next));
      if (!createmode) dispatch(updateParcours(next));
    },
    [createmode, dispatch, selected]
  );

  return (
    <div className={classes.container}>
      <button
        className={classes.button}
        disabled={!isowner}
        style={{ backgroundColor: selected.color || '#D94865' }}
        type="button"
        onClick={openHandler}>
        <span />
      </button>
      {visibility && (
        <div className={classes.popover}>
          <GithubPicker colors={COLORS} width={112} onChange={changeHandler} />
        </div>
      )}
    </div>
  );
});

export default ColorPickerComponent;
