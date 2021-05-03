import React, { memo, useState } from 'react';

import { Wrapper } from './styled/Wrapper';
import { ArrowImage } from './styled/ArrowImage';
import { Button } from './styled/Button';
import { ButtonOutline } from './styled/ButtonOutline';
import { ArrowWrapper } from './styled/ArrowWrapper';

interface NavArrowButtonProps {
  paginate: (newDirection: number) => void;
  size?: number;
  inverse?: boolean;
  onClick?: () => void;
}

export const NavArrowButton = memo<NavArrowButtonProps>(props => {
  const { paginate, inverse, size = 60, ...rest } = props;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <Wrapper
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...rest}
      >
        <Button style={{ width: size, height: size }}>
          <ButtonOutline animate={isHovered ? 'animate' : 'initial'} />
          <ArrowWrapper inverse={inverse}>
            <ArrowImage animate={isHovered ? 'animate' : 'initial'} />
          </ArrowWrapper>
        </Button>
      </Wrapper>
    </>
  );
});

NavArrowButton.displayName = 'NavArrowButton';
