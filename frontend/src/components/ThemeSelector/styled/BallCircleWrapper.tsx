import styled from 'styled-components';
import { motion } from 'framer-motion';

import { springSlow } from 'components/Animations/framerTransitions';

interface Props {}

export const BallCircleWrapper = styled(motion.div)<Props>`
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 50%;
`;

BallCircleWrapper.defaultProps = {
  variants: {
    initial: {
      y: 0,
      x: 0,
    },
    animate: {
      y: '100%',
      x: '-100%',
    },
  },
  initial: 'initial',

  transition: {
    ...springSlow,
  },
};
