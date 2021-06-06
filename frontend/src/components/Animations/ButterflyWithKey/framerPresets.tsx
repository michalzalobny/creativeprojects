const revealTransition = {
  type: 'tween',
  duration: 0.4,
  ease: [0.445, 0.05, 0.55, 0.95],
};

const rotate3d = {
  x: 1,
  y: 0.3,
  z: 0,
  deg: 90,
};

export const reveal = {
  variants: {
    initial: {
      transform: `rotate3d(${rotate3d.x},-${rotate3d.y},${rotate3d.z},${rotate3d.deg}deg)`,
      transition: {
        ...revealTransition,
      },
    },
    animate: {
      transform: `rotate3d(${rotate3d.x},-${rotate3d.y},${rotate3d.z},0deg)`,
      transition: {
        ...revealTransition,
      },
    },
    exit: {
      transform: `rotate3d(${rotate3d.x},${rotate3d.y},${rotate3d.z},-${rotate3d.deg}deg)`,
      transition: {
        ...revealTransition,
      },
    },
  },
};
