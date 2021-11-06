import styled from 'styled-components';
import { motion } from 'framer-motion';

import { springSlow } from 'components/Animations/framerTransitions';

interface Props {}

export const Underline = styled(motion.div)<Props>`
  position: absolute;
  z-index: -2;
  top: 100%;
  width: 100%;
  height: 1px;
  background-color: black;
  transform-origin: left;
`;

Underline.defaultProps = {
  variants: {
    initial: {
      scaleX: 1,
    },
    animate: {
      scaleX: 0,
    },
  },

  transition: {
    ...springSlow,
  },
};
