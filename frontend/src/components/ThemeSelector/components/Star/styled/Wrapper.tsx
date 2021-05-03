import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const Wrapper = styled(motion.div)<Props>``;

Wrapper.defaultProps = {
  variants: {
    initial: {
      x: '100%',
    },
    animate: {
      x: 0,
    },
  },
  transition: {
    type: 'spring',
    stiffness: 200,
    mass: 10,
    damping: 50,
  },
};
