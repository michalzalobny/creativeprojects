import React from 'react';

import { Wrapper } from './styled/Wrapper';
import { ContentWrapper } from './styled/ContentWrapper';
import { Name } from './styled/Name';
import { Text } from './styled/Text';
import { LinkComp } from './styled/LinkComp';

export interface InfoFooterProps {}

export const InfoFooter = (props: InfoFooterProps) => {
  const { ...rest } = props;
  return (
    <>
      <Wrapper {...rest}>
        <ContentWrapper>
          <Name>Michal Zalobny</Name>
          <Text>portfolio</Text>

          <LinkComp
            isExternal
            label="LinkedIn"
            linkHref="https://www.linkedin.com/in/michal-zalobny-1a8257204/"
          />
          <LinkComp
            isExternal
            label="Github"
            linkHref="https://github.com/javusScriptus/creativeprojects/tree/master/frontend/src/containers"
          />
        </ContentWrapper>
      </Wrapper>
    </>
  );
};
