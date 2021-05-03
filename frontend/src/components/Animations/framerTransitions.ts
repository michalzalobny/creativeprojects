export const tween = {
  type: 'tween',
  duration: 0.4,
  restDelta: 0.01,
  restSpeed: 0.01,
};

export const springSlow = {
  type: 'spring',
  stiffness: 350,
  damping: 80,
  mass: 5,
  restDelta: 0.01,
  restSpeed: 0.01,
};

export const springMedium = {
  type: 'spring',
  stiffness: 100,
  damping: 20,
  mass: 1.4,
  restDelta: 0.01,
  restSpeed: 0.01,
};

export const springQuick = {
  type: 'spring',
  stiffness: 100,
  damping: 10,
  restDelta: 0.01,
  restSpeed: 0.01,
};

export const springMod = {
  type: 'spring',
  stiffness: 300,
  damping: 40,
  restDelta: 0.01,
  restSpeed: 0.01,
};

export const springElastic = {
  type: 'spring',
  stiffness: 250,
  damping: 10,
  restDelta: 0.01,
  restSpeed: 0.01,
};

export const sliderSpring = {
  type: 'spring',
  stiffness: 100,
  damping: 25,
  restDelta: 0.01, //Fixes "snapping" bug
  restSpeed: 0.01, //Fixes "snapping" bug
};
