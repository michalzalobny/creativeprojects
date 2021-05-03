import styled from 'styled-components';
import { motion } from 'framer-motion';

import { tween } from 'components/Animations/framerTransitions';

interface Props {}

export const Cover = styled(motion.div)<Props>`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: white;
  z-index: 20;
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
