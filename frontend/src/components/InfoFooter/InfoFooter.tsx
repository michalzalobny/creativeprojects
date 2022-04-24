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
          <h1>
            <Name>Michal Zalobny</Name>
            <Text>portfolio 2021</Text>
          </h1>

          <LinkComp
            isExternal
            label="Twitter"
            linkHref="https://twitter.com/zalobnymichal"
          />
          <LinkComp
            isExternal
            label="Github"
            linkHref="https://github.com/javusScriptus/creativeprojects/tree/master/frontend/src/containers"
          />
          <LinkComp
            isExternal
            label="LinkedIn"
            linkHref="https://www.linkedin.com/in/michal-zalobny-1a8257204/"
          />
        </ContentWrapper>
      </Wrapper>
    </>
  );
};
