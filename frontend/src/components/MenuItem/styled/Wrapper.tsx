import styled from 'styled-components';
import { motion } from 'framer-motion';

import { springMedium } from 'components/Animations/framerTransitions';

import { media, computeValue } from 'utils/responsive';
import { sharedValues } from 'utils/sharedValues';

interface Props {}

export const Wrapper = styled(motion.div)<Props>`
  min-width: 60vw;
  cursor: pointer;
  position: relative;
  padding: 10px 0;

  ${media.tablet} {
    min-width: 25vw;
    padding: 14px 0;
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
