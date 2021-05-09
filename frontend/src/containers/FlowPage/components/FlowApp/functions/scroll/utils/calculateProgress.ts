export const calculateProgress = (
  currentOffset: number,
  limit: number,
): number => {
  const finalProgress = currentOffset / limit;

  return finalProgress;
};
