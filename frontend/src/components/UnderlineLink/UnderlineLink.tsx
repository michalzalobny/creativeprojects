import React from 'react';
import Link from 'next/link';

import { HoverWrapper } from 'components/HoverWrapper/HoverWrapper';
import { ReplaceItem } from 'components/Animations/ReplaceItem/ReplaceItem';

import { Wrapper } from './styled/Wrapper';
import { ContentWrapper } from './styled/ContentWrapper';
import { Text } from './styled/Text';
import { Underline } from './styled/Underline';

export interface UnderlineLinkProps {
  linkHref: string;
  label: string;
}

export const UnderlineLink = (props: UnderlineLinkProps) => {
  const { label, linkHref, ...rest } = props;
  return (
    <>
      <Wrapper {...rest}>
        <ContentWrapper>
          <HoverWrapper>
            <ReplaceItem>
              <Link href={linkHref} passHref>
                <Text>{label}</Text>
              </Link>
            </ReplaceItem>
          </HoverWrapper>

          <Underline />
        </ContentWrapper>
      </Wrapper>
    </>
  );
};
