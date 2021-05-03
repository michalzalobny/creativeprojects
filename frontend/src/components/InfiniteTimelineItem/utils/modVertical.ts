export const modVertical = (
  value: number,
  limit: number,
  elRef: React.RefObject<HTMLDivElement>,
): number => {
  if (value < 0) {
    const offset = Math.floor(-value / limit) * limit;
    const elPosition = elRef.current.offsetTop + elRef.current.clientHeight;
    if (value + offset < -elPosition) {
      return value + offset + limit;
    } else {
      return value + offset;
    }
  } else if (value > 0) {
    const offset = Math.ceil(value / limit) * limit;
    const elPosition = elRef.current.offsetTop + elRef.current.clientHeight;
    if (value - offset < -elPosition) {
      return value - offset + limit;
    } else {
      return value - offset;
    }
  }

  return value;
};
