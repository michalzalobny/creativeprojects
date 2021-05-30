import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const Wrapper = styled(motion.div)<Props>``;

Wrapper.defaultProps = {
  variants: {
    initial: {
      pointerEvents: 'none',
    },
    animate: {
      pointerEvents: 'initial',
    },
  },
  initial: 'initial',
  animate: 'animate',
};
