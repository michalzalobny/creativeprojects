import React, { useState, useEffect } from 'react';

export const useBreakpoint = (breakpoint: number) => {
  const testBreakpoint = React.useCallback(() => {
    return typeof window === 'undefined'
      ? false
      : window.innerWidth >= breakpoint;
  }, [breakpoint]);

  const [isBreakpoint, setIsBreakpoint] = useState(testBreakpoint());

  const onResize = React.useCallback(() => {
    setIsBreakpoint(testBreakpoint());
  }, [testBreakpoint]);

  useEffect(() => {
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [onResize]);

  return isBreakpoint;
};
