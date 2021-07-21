import styled from 'styled-components';
import { motion } from 'framer-motion';

import { tween } from 'components/Animations/framerTransitions';

interface Props {}

export const InfoWrapper = styled(motion.div)<Props>`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 4;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  user-select: none;
`;

InfoWrapper.defaultProps = {
  variants: {
    initial: {
      opacity: 1,
    },
    animate: {
      opacity: 0,
    },
  },
  initial: 'initial',

  transition: {
    ...tween,
  },
};
