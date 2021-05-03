import { useEffect } from 'react';

export const useDisableOverscroll = () => {
  useEffect(() => {
    document.body.style['overscrollBehavior'] = 'none';
    document.body.style.scrollBehavior = 'smooth';

    return () => {
      document.body.style['overscrollBehavior'] = 'auto';
      document.body.style.scrollBehavior = 'auto';
    };
  }, []);
};
