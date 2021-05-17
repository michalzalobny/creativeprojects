import React, { memo } from 'react';

import { Wrapper } from './styled/Wrapper';
import { ContentWrapper } from './styled/ContentWrapper';

export interface RevealItemProps {
  children?: React.ReactNode;
}

export const RevealItem = memo<RevealItemProps>(props => {
  const { children } = props;

  return (
    <>
      <Wrapper>
        <ContentWrapper>{children}</ContentWrapper>
      </Wrapper>
    </>
  );
});

RevealItem.displayName = 'RevealItem';
