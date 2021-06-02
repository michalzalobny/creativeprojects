interface IsPointVisible {
  lat: number;
  lon: number;
  mapWidth: number;
  mapHeight: number;
  imageDataAlphaArray: number[] | Float32Array;
}

export const isPointVisible = ({
  lat,
  lon,
  mapWidth,
  mapHeight,
  imageDataAlphaArray,
}: IsPointVisible) => {
  const x = Math.floor(((lon + 180) / 360) * mapWidth);
  const y = Math.floor(((lat + 90) / 180) * mapHeight);
  const pos = mapWidth * y + x;
  return imageDataAlphaArray[pos] >= 255;
};
