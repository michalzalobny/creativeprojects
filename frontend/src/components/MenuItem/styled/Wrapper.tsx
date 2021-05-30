import styled from 'styled-components';
import { motion } from 'framer-motion';

import { springMedium } from 'components/Animations/framerTransitions';

import { media, computeValue } from 'utils/responsive';
import { sharedValues } from 'utils/sharedValues';

interface Props {}

export const Wrapper = styled(motion.div)<Props>`
  min-width: 25vw;

  margin-bottom: 8vw;

  ${media.tablet} {
    &:not(:last-child) {
      margin-bottom: ${computeValue({
        pixelValue: 80,
        referenceWidth: sharedValues.containers.normal.referenceWidth,
      })};
    }
  }

  ${media.custom(sharedValues.containers.normal.breakpoint)} {
    &:not(:last-child) {
      margin-bottom: 80px;
    }
  }
`;

Wrapper.defaultProps = {
  variants: {
    initial: {
      x: '-15vw',
      opacity: 0,
    },
    animate: {
      x: '0vw',
      opacity: 1,
    },
  },

  transition: {
    ...springMedium,
  },
};
