import { useEffect, useLayoutEffect, useState } from 'react';
import _debounce from 'lodash/debounce';

const useResizeObserver = ({
                             ref,
                             callback,
                             forceTrigger,
                             debounceTime = 300,
                           } = {}) => {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const { current } = ref;

    if (!current) return;

    const trigger = () => {
      setHeight(current.clientHeight);
      setWidth(current.clientWidth);

      if (typeof callback === 'function') callback(current);
    };

    trigger();
  }, [ref, forceTrigger, callback]);

  useLayoutEffect(() => {
    const { current } = ref;

    if (!current) return;

    const trigger = () => {
      setHeight(current.clientHeight);
      setWidth(current.clientWidth);

      if (typeof callback === 'function') callback(current);
    };

    let resizeObserver;

    if ('ResizeObserver' in window) {
      resizeObserver = new ResizeObserver(_debounce(trigger, debounceTime));
      resizeObserver.observe(current);
    }

    trigger();

    return () => resizeObserver?.disconnect();
  }, [ref, callback, debounceTime]);

  return { height, width };
};

export { useResizeObserver };
