import React from 'react';
import { ScrollMotionValues } from 'framer-motion';

import { globalState } from 'utils/globalState';

import { useEffect } from 'react';

interface UseScroll {
  scrollValues: ScrollMotionValues;
}

export const useScroll = ({ scrollValues }: UseScroll) => {
  const scrollingUp = React.useRef(false);

  const onScroll = () => {
    if (!scrollValues) {
      return;
    }

    if (scrollValues.scrollY.get() > scrollValues.scrollY.getPrevious()) {
      scrollingUp.current = true;
    } else {
      scrollingUp.current = false;
    }
  };

  useEffect(() => {
    //Checking if the whole page is wrapped in scrollable div
    if (globalState.pageWrapper.current) {
      return globalState.pageWrapper.current.addEventListener(
        'scroll',
        onScroll,
      );
    }

    window.addEventListener('scroll', onScroll);

    return () => {
      if (globalState.pageWrapper.current) {
        return globalState.pageWrapper.current.removeEventListener(
          'scroll',
          onScroll,
        );
      }

      window.removeEventListener('scroll', onScroll);
    };
  });

  return {
    scrollingUp: scrollingUp.current,
  };
};
