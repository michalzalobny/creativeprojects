import { useEffect, useState } from 'react';

type ElRef = React.RefObject<HTMLDivElement> | React.RefObject<HTMLSpanElement>;

export const useHover = (elRef: ElRef) => {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const refEl = elRef.current;

    if (!refEl) {
      return () => {};
    }

    const onMouseEnter = () => {
      setIsHovered(true);
    };

    const onMouseLeave = () => {
      setIsHovered(false);
    };

    refEl.addEventListener('mouseenter', onMouseEnter);
    refEl.addEventListener('mouseleave', onMouseLeave);

    return () => {
      refEl.removeEventListener('mouseenter', onMouseEnter);
      refEl.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [elRef]);

  return { isHovered };
};
