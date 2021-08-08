import React, { memo } from 'react';

import { Wrapper } from './styled/Wrapper';
import { SocialComp } from './styled/SocialComp';
import { ContentWrapper } from './styled/ContentWrapper';

export interface SocialsBoxProps {
  animate?: 'animate' | 'initial';
}

export const SocialsBox = memo<SocialsBoxProps>(props => {
  const { ...rest } = props;

  return (
    <>
      <Wrapper {...rest}>
        <ContentWrapper>
          <SocialComp
            label="LinkedIn"
            hrefDestination={
              'https://www.linkedin.com/in/michal-zalobny-1a8257204/'
            }
          />
          <SocialComp
            label="Github"
            hrefDestination={
              'https://github.com/javusScriptus/creativeprojects/tree/master/frontend/src/containers'
            }
            description="Drop a Star &#10084;  "
          />
        </ContentWrapper>
      </Wrapper>
    </>
  );
});

SocialsBox.displayName = 'SocialsBox';
