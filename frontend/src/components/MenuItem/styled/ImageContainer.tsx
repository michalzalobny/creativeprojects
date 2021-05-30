import styled from 'styled-components';
import { motion } from 'framer-motion';

import { springSlow } from 'components/Animations/framerTransitions';

interface Props {}

export const ImageContainer = styled(motion.div)<Props>`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  z-index: -1;
`;

ImageContainer.defaultProps = {
  variants: {
    initial: {
      opacity: 0,
      scale: 0.6,
      x: '-70%',
      y: '-50%',
    },
    animate: {
      opacity: 0.8,
      scale: 1,
      x: '-50%',
      y: '-50%',
    },
  },

  transition: {
    ...springSlow,
  },
};
