import React, { memo } from 'react';
import Link from 'next/link';

import { CustomContainer } from 'components/CustomContainer/CustomContainer';
import { sharedValues } from 'utils/sharedValues';

import { FooterContainer } from './styled/FooterContainer';
import { ContentWrapper } from './styled/ContentWrapper';
import { FooterLink } from './styled/FooterLink';
import { InfoText } from './styled/InfoText';

interface FooterProps {}

export const Footer = memo<FooterProps>(props => {
  return (
    <FooterContainer>
      <CustomContainer containerSettings={sharedValues.containers.normal}>
        <ContentWrapper>
          <Link href="/privacy-policy" passHref>
            <FooterLink renderAs="a">privacy policy</FooterLink>
          </Link>
          <InfoText text={`all rights reserverd${new Date().getFullYear()}`} />

          <Link href="/panel" passHref>
            <FooterLink renderAs="a">panel</FooterLink>
          </Link>
        </ContentWrapper>
      </CustomContainer>
    </FooterContainer>
  );
});

Footer.displayName = 'Footer';
