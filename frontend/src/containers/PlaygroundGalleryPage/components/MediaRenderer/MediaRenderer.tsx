import React from 'react';

import * as S from './MediaRenderer.styles';

export interface Props {
  mediaSrc: string;
  mediaType: string;
}

export const MediaRenderer = (props: Props) => {
  const { mediaSrc, mediaType, ...rest } = props;

  return (
    <>
      <S.Wrapper {...rest}>
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
