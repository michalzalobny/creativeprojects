import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const Wrapper = styled(motion.div)<Props>`
  position: relative;
  min-width: 100%;
  height: 100%;
  background-color: #00070c; //021A38 //02162b //000b14
  opacity: 0;

  transition: opacity 1s;
  transition-delay: 1.5s;
`;

Wrapper.defaultProps = {
  variants: {
    initial: {},
    animate: {},
    exit: {},
  },
  transition: {
    staggerChildren: 0.2,
  },
};
