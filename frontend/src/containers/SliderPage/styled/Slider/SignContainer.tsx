import styled from 'styled-components';
import { motion } from 'framer-motion';

import { springVerySlow } from 'components/Animations/framerTransitions';

interface Props {}

export const SignContainer = styled(motion.div)<Props>`
  position: relative;
  width: 100%;
  height: 100%;
  user-select: none;
  pointer-events: none;
`;

SignContainer.defaultProps = {
  variants: {
    initial: {
      opacity: 1,
      scale: 1,
    },
    animate: {
      opacity: 0,
      scale: 1.5,
    },
  },
  initial: 'initial',

  transition: {
    ...springVerySlow,
  },
};
