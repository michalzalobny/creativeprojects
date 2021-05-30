import styled from 'styled-components';
import { motion } from 'framer-motion';

import { springMedium } from 'components/Animations/framerTransitions';

interface Props {}

export const Wrapper = styled(motion.div)<Props>``;

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
