export const getRandBetween = (minimum: number, maximum: number): number => {
  return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
};

export const getRand = (minimum: number, maximum: number): number => {
  return Math.random() * (maximum - minimum + 1) + minimum;
};
