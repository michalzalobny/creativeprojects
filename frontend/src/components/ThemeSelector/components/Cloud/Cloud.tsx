import React, { memo } from 'react';

import { Wrapper } from './styled/Wrapper';
import { CloudImage } from './styled/CloudImage';

interface CloudProps {
  size: number;
  posX: number;
  posY: number;
}

export const Cloud = memo<CloudProps>(props => {
  const { size, posX, posY } = props;
  return (
    <>
      <Wrapper>
        <CloudImage posX={posX} posY={posY} size={size} />
      </Wrapper>
    </>
  );
});

Cloud.displayName = 'Cloud';
