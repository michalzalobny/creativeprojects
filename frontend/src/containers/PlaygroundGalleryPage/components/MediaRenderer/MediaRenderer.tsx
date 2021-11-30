import React from 'react';

import * as S from './MediaRenderer.styles';

export interface Props {}

export const MediaRenderer = (props: Props) => {
  const { ...rest } = props;

  return (
    <>
      <S.Wrapper {...rest}></S.Wrapper>
    </>
  );
};
