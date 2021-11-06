import React from 'react';

import { Wrapper } from './styled/Wrapper';
import { ContentWrapper } from './styled/ContentWrapper';

export interface ArrowBtnProps {}

export const ArrowBtn = (props: ArrowBtnProps) => {
  const { ...rest } = props;
  return (
    <>
      <Wrapper {...rest}>
        <ContentWrapper></ContentWrapper>
      </Wrapper>
    </>
  );
};
