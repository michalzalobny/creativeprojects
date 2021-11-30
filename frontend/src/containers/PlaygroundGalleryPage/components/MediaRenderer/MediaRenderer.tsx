import React, { useMemo } from 'react';

import { useMediaPreload } from '../../hooks/useMediaPreload';

import * as S from './MediaRenderer.styles';

export interface Props {
  mediaSrc: string;
  mediaType: string;
}

export const MediaRenderer = (props: Props) => {
  const { mediaSrc, mediaType, ...rest } = props;

  const isImage = useMemo(() => mediaType === 'image', [mediaType]);

  const { isLoaded } = useMediaPreload({
    mediaSrc,
    isImage,
  });

  const wrapperV = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
  };

  return (
    <>
      <S.Wrapper
        initial="initial"
        animate={isLoaded ? 'animate' : 'initial'}
        variants={wrapperV}
        {...rest}
      >
        {mediaType === 'video' ? (
          <S.Video autoPlay playsInline loop muted>
            <source src={mediaSrc} type="video/mp4" />
          </S.Video>
        ) : (
          <S.Image src={mediaSrc} />
        )}
      </S.Wrapper>
    </>
  );
};
