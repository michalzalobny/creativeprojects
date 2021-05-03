import React, { useEffect, useState } from 'react';

export interface ImageSizes {
  width: number;
  height: number;
}
interface Props {
  imageSrc: string;
}

export const useImagePreload = (props: Props) => {
  const { imageSrc } = props;
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageSizes, setImageSizes] = useState<ImageSizes>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const onImageLoad = (image: HTMLImageElement) => {
      setImageSizes({ width: image.naturalWidth, height: image.naturalHeight });
      setIsLoaded(true);
    };

    const image = new Image();
    image.src = imageSrc;

    if (image.complete) {
      setImageSizes({ width: image.naturalWidth, height: image.naturalHeight });
      return setIsLoaded(true);
    }

    const load = () => onImageLoad(image);

    image.addEventListener('load', load);

    return () => {
      image.removeEventListener('load', load);
    };
  }, [imageSrc]);

  return { isLoaded, imageSizes };
};
