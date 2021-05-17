import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const SwipeWrapper = styled(motion.div)<Props>`
  position: relative;
`;

SwipeWrapper.defaultProps = {
  variants: {
    initial: {
      transition: {
        staggerDirection: -1,
        delayChildren: 0,
        staggerChildren: 0.3,
      },
    },
    animate: {},
    exit: {},
  },

  transition: {
    delayChildren: 0.4,
    staggerChildren: 0.3,
  },
};
