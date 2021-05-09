import normalizeWheel from 'normalize-wheel';

import { lerp } from './utils/lerp';

export const scroll = () => {
  const scrollObj = {
    ease: 0.05,
    current: 0,
    target: 0,
    last: 0,
    position: 0,
  };

  let isDown = false;
  let start;

  /**
   * Events.
   */
  const onTouchDown = event => {
    isDown = true;

    scrollObj.position = scrollObj.current;
    start = event.touches ? event.touches[0].clientY : event.clientY;
  };

  const onTouchMove = event => {
    if (!isDown) return;

    const y = event.touches ? event.touches[0].clientY : event.clientY;
    const distance = (start - y) * 2;

    scrollObj.target = scrollObj.position + distance;
  };

  const onTouchUp = event => {
    isDown = false;
  };

  const onWheel = event => {
    const normalized = normalizeWheel(event);
    const speed = normalized.pixelY;

    scrollObj.target += speed * 0.5;
  };

  const update = () => {
    scrollObj.last = scrollObj.current;
    scrollObj.current = lerp(
      scrollObj.current,
      scrollObj.target,
      scrollObj.ease,
    );
  };

  const addEventListeners = () => {
    window.addEventListener('mousewheel', onWheel);
    window.addEventListener('wheel', onWheel);

    window.addEventListener('mousedown', onTouchDown);
    window.addEventListener('mousemove', onTouchMove);
    window.addEventListener('mouseup', onTouchUp);

    window.addEventListener('touchstart', onTouchDown);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onTouchUp);
  };

  addEventListeners();

  return {
    update,
    scrollObj,
  };
};
