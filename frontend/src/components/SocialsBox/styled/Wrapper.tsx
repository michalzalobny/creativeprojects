import styled from 'styled-components';
import { motion } from 'framer-motion';

import { springSlow } from 'components/Animations/framerTransitions';

interface Props {}

export const Wrapper = styled(motion.div)<Props>``;

Wrapper.defaultProps = {
  variants: {
    initial: {
      opacity: 0,
      pointerEvents: 'none',
      transition: {
        ...springSlow,
      },
    },
    animate: {
      opacity: 1,
      pointerEvents: 'initial',
      transition: {
        ...springSlow,
        delay: 0.4,
      },
    },
  },
  initial: 'initial',
};
