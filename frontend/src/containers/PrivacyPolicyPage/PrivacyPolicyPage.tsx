import React from 'react';

import { CustomContainer } from 'components/CustomContainer/CustomContainer';
import { Footer } from 'components/Footer/Footer';
import { sharedValues } from 'utils/sharedValues';

import { Wrapper } from './styled/Wrapper';

interface Props {}

export default function PrivacyPolicyPage(props: Props) {
  return (
    <>
      <Wrapper>
        <CustomContainer containerSettings={sharedValues.containers.normal}>
          <p>Privacy policy</p>
        </CustomContainer>
        <Footer></Footer>
      </Wrapper>
    </>
  );
}
