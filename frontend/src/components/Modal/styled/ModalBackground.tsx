import styled from 'styled-components';
import { motion } from 'framer-motion';

import { tween } from 'components/Animations/framerTransitions';

interface Props {}

export const ModalBackground = styled(motion.button)<Props>`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: black;
`;
ModalBackground.defaultProps = {
  variants: {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 0.5,
    },
    exit: {
      opacity: 0,
    },
  },

  transition: {
    ...tween,
    duration: 0.3,
  },
};
