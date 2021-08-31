import styled from 'styled-components';
import { motion } from 'framer-motion';

import { springVerySlow } from 'components/Animations/framerTransitions';

interface Props {}

export const SignWrapper = styled(motion.div)<Props>``;

SignWrapper.defaultProps = {
  variants: {
    initial: {
      scale: 2,
      opacity: 0,
    },
    animate: {
      scale: 1,
      opacity: 1,
    },
  },
  initial: 'initial',
  animate: 'animate',

  transition: {
    ...springVerySlow,
  },
};
