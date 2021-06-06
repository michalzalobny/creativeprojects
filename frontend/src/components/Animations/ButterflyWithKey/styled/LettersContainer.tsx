import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const LettersContainer = styled(motion.span)<Props>`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

LettersContainer.defaultProps = {
  variants: {
    initial: {
      transition: {
        staggerChildren: 0.04,
      },
    },
    animate: {
      transition: {
        delayChildren: 0.04,
        staggerChildren: 0.04,
      },
    },
    exit: {
      transition: {
        staggerChildren: 0.04,
      },
    },
  },
};
