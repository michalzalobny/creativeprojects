import styled from 'styled-components';
import { motion } from 'framer-motion';

import { media } from 'utils/responsive';

interface Props {}

export const Wrapper = styled(motion.div)<Props>`
  position: relative;
  min-width: 100%;
  background-color: white;
  padding: 4rem;

  ${media.tablet} {
    padding: 11rem;
  }
`;

Wrapper.defaultProps = {
  variants: {
    initial: {
      opacity: 1,
    },
    animate: {
      opacity: 1,
    },
    exit: {
      opacity: 1,
    },
  },
  transition: {
    staggerChildren: 0.2,
  },
};
