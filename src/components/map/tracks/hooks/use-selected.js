import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const useSelected = data => {
  const [opacity, setOpacity] = useState(1);
  const [isselected, setIsSelected] = useState(false);
  const [showdistances, setShowDistances] = useState(true);

  const selected = useSelector(_ => _.selected);

  useEffect(() => {
    setIsSelected(selected && selected === data.id);
  }, [data.id, selected]);

  useEffect(() => {
    const value = selected && !isselected ? 0.25 : 1;
    setOpacity(value);
  }, [data.id, isselected, selected]);

  useEffect(() => {
    const next = !selected || isselected;
    setShowDistances(next);
  }, [data.id, isselected, selected]);

  return { isselected, opacity, showdistances };
};

export default useSelected;
