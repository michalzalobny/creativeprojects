import styled from 'styled-components';
import { motion } from 'framer-motion';

import { springVerySlow } from 'components/Animations/framerTransitions';

interface Props {}

export const SignContainer = styled(motion.div)<Props>`
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  user-select: none;
  pointer-events: none;
`;

SignContainer.defaultProps = {
  variants: {
    initial: {
      opacity: 1,
      scale: 1,
      x: '-50%',
      y: '-50%',
    },
    animate: {
      opacity: 0,
      scale: 2,
      x: '-50%',
      y: '-50%',
    },
  },
  initial: 'initial',

  transition: {
    ...springVerySlow,
  },
};
