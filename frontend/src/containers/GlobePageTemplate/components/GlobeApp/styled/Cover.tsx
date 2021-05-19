import styled from 'styled-components';
import { motion } from 'framer-motion';

import { tween } from 'components/Animations/framerTransitions';

interface Props {}

export const Cover = styled(motion.div)<Props>`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: white;
  z-index: 1;
`;

Cover.defaultProps = {
  variants: {
    initial: {
      opacity: 1,
      pointerEvents: 'initial',
    },
    animate: {
      opacity: 0,
      pointerEvents: 'none',
    },
  },
  transition: {
    ...tween,
  },
};
