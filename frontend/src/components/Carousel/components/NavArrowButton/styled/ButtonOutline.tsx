import styled from 'styled-components';
import { motion } from 'framer-motion';

import { springMedium } from 'components/Animations/framerTransitions';

interface Props {}

export const ButtonOutline = styled(motion.div)<Props>`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid white;
  border-radius: 50%;
  backface-visibility: hidden;
`;

ButtonOutline.defaultProps = {
  variants: {
    initial: {
      x: '-50%',
      y: '-50%',
      scale: 1,
    },
    animate: {
      x: '-50%',
      y: '-50%',
      scale: 1.1,
    },
  },
  initial: 'initial',
  animate: 'animate',

  transition: {
    ...springMedium,
  },
};
