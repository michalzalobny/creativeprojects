import styled from 'styled-components';
import { motion } from 'framer-motion';

import { tween } from 'components/Animations/framerTransitions';

interface Props {}

export const HeadingWrapper = styled(motion.div)<Props>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  width: 100%;
  user-select: none;
  pointer-events: none;
  max-width: 800px;
  display: flex;
  flex-direction: column;
`;

HeadingWrapper.defaultProps = {
  variants: {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
  },
  initial: 'initial',
  transition: {
    ...tween,
  },
};
