import styled from 'styled-components';
import { motion } from 'framer-motion';

import { springVerySlow } from 'components/Animations/framerTransitions';

interface Props {}

export const SignWrapper = styled(motion.div)<Props>`
  position: absolute;
  z-index: 10;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

SignWrapper.defaultProps = {
  variants: {
    initial: {
      scale: 2,
      opacity: 0,
      x: '-50%',
      y: '-50%',
    },
    animate: {
      scale: 1,
      opacity: 1,
      x: '-50%',
      y: '-50%',
    },
  },
  initial: 'initial',
  animate: 'animate',

  transition: {
    ...springVerySlow,
  },
};
