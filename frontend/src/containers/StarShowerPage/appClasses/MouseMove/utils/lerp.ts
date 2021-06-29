export const lerp = (p1: number, p2: number, t: number) => {
  return p1 + (p2 - p1) * t;
};

// export const lerp = (a, b, n) => (1 - n) * a + n * b;
