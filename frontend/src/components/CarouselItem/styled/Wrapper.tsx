import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const Wrapper = styled(motion.div)<Props>``;

Wrapper.defaultProps = {
  variants: {
    initial: {},
    animate: {
      transition: {
        delayChildren: 0,
      },
    },
    exit: {},
  },
  initial: 'initial',
  animate: 'animate',
  exit: 'exit',
};
