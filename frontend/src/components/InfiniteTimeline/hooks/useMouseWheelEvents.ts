import React from 'react';
import normalizeWheel from 'normalize-wheel';

type UseMouseWheelEvents = {
  useMomentum: React.MutableRefObject<boolean>;
  applyScroll: (ApplyScroll) => void;
};

export const useMouseWheelEvents = (props: UseMouseWheelEvents) => {
  const { useMomentum, applyScroll } = props;

  const onMouseWheel = (event: WheelEvent) => {
    useMomentum.current = false;

    const { pixelY } = normalizeWheel(event);

    applyScroll({
      horizontalAmountPx: -pixelY,
      verticalAmountPx: -pixelY,
    });
  };

  return {
    onMouseWheel,
  };
};
