import { useState, useEffect } from 'react';
import { debounce } from 'lodash';

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    windowWidth: undefined,
    windowHeight: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
      });
    };

    const handleResizeDebounced = debounce(() => {
      handleResize();
    }, 50);

    handleResize();
    window.addEventListener('resize', handleResizeDebounced);
    return () => window.removeEventListener('resize', handleResizeDebounced);
  }, []);

  return windowSize;
};
