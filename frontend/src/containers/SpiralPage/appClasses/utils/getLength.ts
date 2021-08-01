export const getLength = (x1: number, y1: number, x2: number, y2: number) => {
  const dist = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
  return dist;
};
