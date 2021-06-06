import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const LettersContainer = styled(motion.span)<Props>`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  /* overflow: hidden; */
`;

LettersContainer.defaultProps = {
  variants: {
    initial: {},
    animate: {},
  },
};
