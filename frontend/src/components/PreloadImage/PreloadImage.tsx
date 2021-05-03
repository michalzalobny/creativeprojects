import { AnimatePresence } from 'framer-motion';
import React from 'react';

import { useImagePreload } from 'hooks/useImagePreload';

import { ImageWrapper } from './styled/ImageWrapper';

interface PreloadImageProps {
  imageSrc: string;
  children: React.ReactNode;
}

export const PreloadImage = React.memo<PreloadImageProps>(props => {
  const { children, imageSrc } = props;
  const { imageSizes, isLoaded } = useImagePreload({ imageSrc: imageSrc });

  return (
    <>
      <AnimatePresence>
        {isLoaded && (
          <ImageWrapper>{React.Children.toArray(children)}</ImageWrapper>
        )}
      </AnimatePresence>
    </>
  );
});

PreloadImage.displayName = 'PreloadImage';
