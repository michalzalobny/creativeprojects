import React from 'react';

import { HoverWrapper } from 'components/HoverWrapper/HoverWrapper';
import { ReplaceItem } from 'components/Animations/ReplaceItem/ReplaceItem';

import { Wrapper } from './styled/Wrapper';
import { ContentWrapper } from './styled/ContentWrapper';
import { Text } from './styled/Text';
import { Underline } from './styled/Underline';

export interface UnderlineLinkProps {
  linkHref: string;
  label: string;
  isMail?: boolean;
  isExternal?: boolean;
}

export const UnderlineLink = (props: UnderlineLinkProps) => {
  const { isExternal, isMail, label, linkHref, ...rest } = props;
  return (
    <>
      <Wrapper {...rest}>
        <ContentWrapper
          href={`${isMail ? `mailto:${linkHref}` : linkHref}`}
          target={`${isMail || !isExternal ? '_self' : '_blank'}`}
        >
          <HoverWrapper>
            <ReplaceItem>
              <Text>{label}</Text>
            </ReplaceItem>
          </HoverWrapper>

          <Underline />
        </ContentWrapper>
      </Wrapper>
    </>
  );
};
