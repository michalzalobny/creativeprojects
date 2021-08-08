import React, { memo, useRef } from 'react';

import { useHover } from 'hooks/useHover';

import { Wrapper } from './styled/Wrapper';
import { Anchor } from './styled/Anchor';
import { ContentWrapper } from './styled/ContentWrapper';
import { Description } from './styled/Description';

export interface SocialProps {
  label: string;
  description?: string;
  hrefDestination: string;
}

export const Social = memo<SocialProps>(props => {
  const { description, hrefDestination, label, ...rest } = props;

  const wrapperRef = useRef(null);
  const { isHovered } = useHover(wrapperRef);

  return (
    <>
      <Wrapper {...rest}>
        <ContentWrapper>
          <Anchor ref={wrapperRef} target="_blank" href={hrefDestination}>
            {label}
          </Anchor>
          {description && (
            <Description animate={isHovered ? 'animate' : 'initial'}>
              {description}
            </Description>
          )}
        </ContentWrapper>
      </Wrapper>
    </>
  );
});

Social.displayName = 'Social';
