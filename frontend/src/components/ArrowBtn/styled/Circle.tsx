import styled from 'styled-components';
import { motion } from 'framer-motion';

import { springElastic } from 'components/Animations/framerTransitions';

interface Props {}

export const Circle = styled(motion.div)<Props>`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  border: 1px solid white;
`;

Circle.defaultProps = {
  variants: {
    initial: {
      x: '-50%',
      y: '-50%',
      scale: 1,
    },
    animate: {
      x: '-50%',
      y: '-50%',
      scale: 1.2,
    },
  },

  transition: {
    ...springElastic,
  },
};
