import styled from 'styled-components';
import { motion } from 'framer-motion';

import { tween } from 'components/Animations/framerTransitions';

interface Props {}

export const TextsContainer = styled(motion.div)<Props>`
  display: flex;
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-90deg);
`;

TextsContainer.defaultProps = {
  variants: {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
  },
  initial: 'initial',
  animate: 'animate',

  transition: {
    delay: 0.8,
    duration: 1,
    type: 'tween',
  },
};
