import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const Wrapper = styled(motion.div)<Props>`
  position: relative;
  min-width: 100%;
  height: 100%;
  background-color: #0a0a0a;
  /* background-color: #d4d4d4; */
  user-select: none;
  pointer-events: none;
  overflow: hidden;
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
