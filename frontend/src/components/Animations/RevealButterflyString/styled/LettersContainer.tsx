import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const LettersContainer = styled(motion.span)<Props>`
  display: inline-block;
  overflow: hidden;
`;

LettersContainer.defaultProps = {
  variants: {
    initial: {},
    animate: {},
  },

  transition: {
    staggerChildren: 0.04,
  },
};
