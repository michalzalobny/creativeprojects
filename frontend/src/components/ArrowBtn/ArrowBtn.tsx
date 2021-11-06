import React from 'react';
import { useRouter } from 'next/router';

import { HoverWrapper } from 'components/HoverWrapper/HoverWrapper';

import { Wrapper } from './styled/Wrapper';
import { ContentWrapper } from './styled/ContentWrapper';
import { Circle } from './styled/Circle';
import { Text } from './styled/Text';

export interface ArrowBtnProps {}

export const ArrowBtn = (props: ArrowBtnProps) => {
  const { ...rest } = props;

  const router = useRouter();

  return (
    <>
      <Wrapper {...rest}>
        <HoverWrapper onClick={() => router.push('/')}>
          <ContentWrapper>
            <Text>Back</Text>
            <Circle />
          </ContentWrapper>
        </HoverWrapper>
      </Wrapper>
    </>
  );
};
