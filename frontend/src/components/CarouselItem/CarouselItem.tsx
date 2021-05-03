import React, { memo } from 'react';
import { motion } from 'framer-motion';

import { Wrapper } from './styled/Wrapper';
import { ContentWrapper } from './styled/ContentWrapper';
import { slide } from './framerPresets';

interface CarouselItemProps {
  direction?: number; //Passed by PropsItem component in Carousel
}

export const CarouselItem = memo<CarouselItemProps>(props => {
  const { direction } = props;
  return (
    <>
      <Wrapper>
        <ContentWrapper>
          <motion.p {...slide} custom={direction}>
            testowy paragraf z animacją
          </motion.p>
          <motion.h1 {...slide} custom={direction}>
            testowy heading z animacją
          </motion.h1>
        </ContentWrapper>
      </Wrapper>
    </>
  );
});

CarouselItem.displayName = 'CarouselItem';
