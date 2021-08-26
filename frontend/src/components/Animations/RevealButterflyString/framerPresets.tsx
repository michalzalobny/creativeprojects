const revealTransition = {
  type: 'tween',
  duration: 0.4,
  ease: [0.445, 0.05, 0.55, 0.95],
  opacity: {
    ease: 'easeIn',
    duration: 0.2,
  },
};

const revealTransitionDefault = {
  type: 'tween',
  duration: 0.6,
  ease: [0.445, 0.05, 0.55, 0.95],
  opacity: {
    ease: 'easeIn',
    duration: 0.4,
  },
};

const rotate3d = {
  x: 1,
  y: 0.4,
  z: 0,
  deg: 90,
};

export const reveal = {
  variants: {
    initial: {
      opacity: 0,
      transform: `rotate3d(-${rotate3d.x},-${rotate3d.y},${rotate3d.z},${rotate3d.deg}deg)`, //remove "-" before x
      transition: {
        ...revealTransition,
      },
    },
    animate: {
      opacity: 1,
      transform: `rotate3d(-${rotate3d.x},-${rotate3d.y},${rotate3d.z},0deg)`, //remove "-" before x
      transition: {
        ...revealTransitionDefault,
      },
    },
  },
};
