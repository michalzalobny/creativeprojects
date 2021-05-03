import React, { memo } from 'react';

import { Wrapper } from './styled/Wrapper';
import { StarImage } from './styled/StarImage';

interface CloudProps {
  posX: number;
  posY: number;
  size: number;
  delay: number;
  height: number;
}

export const ShootingStar = memo<CloudProps>(props => {
  const { posX, posY, size, delay, height } = props;

  return (
    <>
      <Wrapper posX={posX} posY={posY}>
        <StarImage
          transition={{
            type: 'tween',
            ease: 'easeOut',
            duration: 1,
            repeat: Infinity,
            repeatDelay: delay,
          }}
          size={size}
          height={height}
        />
      </Wrapper>
    </>
  );
});

ShootingStar.displayName = 'ShootingStar';
