import styled from 'styled-components';
import { motion } from 'framer-motion';

import { tween } from 'components/Animations/framerTransitions';

interface Props {}

export const OpacityWrapper = styled(motion.div)<Props>``;

OpacityWrapper.defaultProps = {
  variants: {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
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
