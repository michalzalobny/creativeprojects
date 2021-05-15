export const retrieveCurrentOffset = (
  progress: number,
  limit: number,
): number => {
  return progress * limit;
};
