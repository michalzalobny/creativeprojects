import { useEffect } from 'react';

interface HandlersProps {
  onStart(x: number, y: number): void;
  onMove(x: number, y: number): void;
  onEnd(x: number, y: number): void;
}

export const useTouch = (handlers: HandlersProps) => {
  useEffect(() => {
    window.addEventListener('mousedown', onStart);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onEnd);

    window.addEventListener('touchstart', onStart);
    window.addEventListener('touchmove', onMove);
    window.addEventListener('touchend', onEnd);

    return () => {
      window.removeEventListener('mousedown', onStart);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onEnd);

      window.removeEventListener('touchstart', onStart);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onStart = e => callHandler('onStart', e);
  const onMove = e => callHandler('onMove', e);
  const onEnd = e => callHandler('onEnd', e);

  const callHandler = (eventName, e) => {
    if (
      eventName &&
      handlers[eventName] &&
      typeof handlers[eventName] === 'function'
    ) {
      handlers[eventName](
        e.touches ? e.touches[0].clientX : e.clientX,
        e.touches ? e.touches[0].clientX : e.clientX,
      );
    }
  };
};
