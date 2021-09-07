import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const Wrapper = styled(motion.div)<Props>`
  position: relative;
  min-width: 100%;
  height: 100%;
  background-color: #f2e8dd;
  user-select: none;
  pointer-events: none;
  overflow: hidden;

  &:before {
    content: '';
    display: block;
    position: absolute;
    z-index: 5;
    top: 0;
    left: 0;
    width: 100%;
    height: 10vh;
    background: linear-gradient(
      0deg,
      rgba(242, 232, 221, 0) 0%,
      rgba(242, 232, 221, 1) 80%
    );
  }

  &:after {
    content: '';
    display: block;
    position: absolute;
    z-index: 5;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 10vh;
    background: linear-gradient(
      180deg,
      rgba(242, 232, 221, 0) 0%,
      rgba(242, 232, 221, 1) 80%
    );
  }
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
