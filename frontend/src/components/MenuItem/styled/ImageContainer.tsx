import styled from 'styled-components';
import { motion } from 'framer-motion';

import { springSlow } from 'components/Animations/framerTransitions';

interface Props {}

export const ImageContainer = styled(motion.div)<Props>`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(0%, -50%);
  z-index: -1;
  pointer-events: none;
`;

ImageContainer.defaultProps = {
  variants: {
    initial: {
      opacity: 0,
      scale: 0.6,
      x: '0%',
      y: '-50%',
    },
    animate: {
      opacity: 1,
      scale: 1,
      x: '0%',
      y: '-50%',
    },
  },

  transition: {
    ...springSlow,
  },
};
