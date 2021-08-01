interface GetBoundaryOpacity {
  borderVal: number;
  coordinate: number;
  referenceVal: number;
}

export const getBoundaryOpacity = ({
  borderVal,
  coordinate,
  referenceVal,
}: GetBoundaryOpacity) => {
  const normalizedDistance = coordinate / referenceVal;

  let currentOpacity = 1;

  if (normalizedDistance <= borderVal) {
    currentOpacity = Math.min(Math.max(normalizedDistance / borderVal, 0), 1);
  }

  if (normalizedDistance >= 1 - borderVal) {
    currentOpacity = Math.min(
      Math.max((1 - normalizedDistance) / borderVal, 0),
      1,
    );
  }

  return currentOpacity;
};
