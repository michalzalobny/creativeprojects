export const modHorizontal = (
  value: number,
  limit: number,
  elRef: React.RefObject<HTMLDivElement>,
): number => {
  if (value < 0) {
    const offset = Math.floor(-value / limit) * limit;
    const elPosition = elRef.current.offsetLeft + elRef.current.clientWidth;
    if (value + offset < -elPosition) {
      return value + offset + limit;
    } else {
      return value + offset;
    }
  } else if (value > 0) {
    const offset = Math.ceil(value / limit) * limit;
    const elPosition = elRef.current.offsetLeft + elRef.current.clientWidth;
    if (value - offset < -elPosition) {
      return value - offset + limit;
    } else {
      return value - offset;
    }
  }

  return value;
};
