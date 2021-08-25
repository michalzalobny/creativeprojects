import React, { useState, useEffect } from 'react';

export const useBreakpoint = (breakpoint: number) => {
  const [isBreakpoint, setIsBreakpoint] = useState(false);

  const testBreakpoint = React.useCallback(() => {
    return typeof window === 'undefined'
      ? false
      : window.innerWidth >= breakpoint;
  }, [breakpoint]);

  useEffect(() => {
    const onResize = () => {
      setIsBreakpoint(testBreakpoint());
    };
    window.addEventListener('resize', onResize);
    onResize();
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [testBreakpoint]);

  return isBreakpoint;
};
