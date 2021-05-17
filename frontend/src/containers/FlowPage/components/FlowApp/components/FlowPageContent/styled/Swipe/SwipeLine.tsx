import styled from 'styled-components';
import { motion } from 'framer-motion';

import { media } from 'utils/responsive';
import { springSlow } from 'components/Animations/framerTransitions';

interface Props {}

export const SwipeLine = styled(motion.div)<Props>`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 1px;
  background-color: white;
  left: 50%;
  bottom: 0;
  transform: translateX('-50%');
  transform-origin: left;

  ${media.tablet} {
    height: 2px;
  }
`;

SwipeLine.defaultProps = {
  variants: {
    initial: {
      x: '-50%',
      scaleX: 0,
    },
    animate: {
      x: '-50%',
      scaleX: 1,
    },
  },

  transition: {
    ...springSlow,
  },
};
