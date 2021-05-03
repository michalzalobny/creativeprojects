import styled from 'styled-components';
import { motion } from 'framer-motion';

import { springSlow } from 'components/Animations/framerTransitions';

interface Props {}

export const VideoCover = styled(motion.div)<Props>`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  background-color: black;
`;

VideoCover.defaultProps = {
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
  initial: 'initial',
  animate: 'animate',

  transition: {
    ...springSlow,
  },
};
