export const getPaddedOffset = (progress: number, limit: number): number => {
  const progressCeil = Math.ceil(progress);
  return progressCeil * limit;
};
