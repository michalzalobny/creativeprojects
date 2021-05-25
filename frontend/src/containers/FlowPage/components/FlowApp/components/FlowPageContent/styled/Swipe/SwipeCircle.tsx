import styled from 'styled-components';
import { motion } from 'framer-motion';

import { springSlow } from 'components/Animations/framerTransitions';
import { media } from 'utils/responsive';

interface Props {}

export const SwipeCircle = styled(motion.div)<Props>`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 25%;
  border: 1px solid white;
  z-index: 1;
  border-radius: 50%;
  transform: translate(-50%, 50%);

  ${media.tablet} {
    border: 1px solid white;
  }

  &:before {
    content: '';
    display: block;
    padding-bottom: 100%;
    width: 100%;
  }
`;

SwipeCircle.defaultProps = {
  variants: {
    initial: {
      scale: 0,
      x: '-50%',
      y: '50%',
    },
    animate: {
      scale: 1,
      x: '-50%',
      y: '50%',
    },
  },

  transition: {
    ...springSlow,
  },
};
