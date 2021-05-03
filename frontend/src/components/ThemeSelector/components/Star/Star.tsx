import React, { memo } from 'react';

import { Wrapper } from './styled/Wrapper';
import { StarImage } from './styled/StarImage';

interface CloudProps {
  size: number;
  posX: number;
  posY: number;
}

export const Star = memo<CloudProps>(props => {
  const { size, posX, posY } = props;
  return (
    <>
      <Wrapper>
        <StarImage size={size} posX={posX} posY={posY} />
      </Wrapper>
    </>
  );
});

Star.displayName = 'Star';
