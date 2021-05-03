import styled from 'styled-components';
import { motion } from 'framer-motion';

import { springElastic } from 'components/Animations/framerTransitions';

interface Props {}

export const StatWrapper = styled(motion.div)<Props>`
  position: absolute;
  top: 10vh;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  width: 100px;
  height: 100px;
  pointer-events: none;
`;

StatWrapper.defaultProps = {
  variants: {
    initial: {
      x: '-50%',
      y: '0%',
      scale: 1,
      top: '10vh',
    },
    animate: {
      x: '-50%',
      y: '-50%',
      scale: 2.5,
      top: '50%',
    },
  },

  transition: {
    ...springElastic,
  },
};
