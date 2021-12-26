import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const Wrapper = styled(motion.div)<Props>`
  position: relative;
  min-width: 100%;
  height: 100%;
  background-color: white;
  user-select: none;
  // pointer-events: none;
  overflow: hidden;

  &:after {
    opacity: 0;
    content: '';
    height: 100%;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 1px;
    z-index: 10;
    background: #003cff;
  }

  [data-animation='paragraph'] {
    span {
      display: inline-block;
      overflow: hidden;
      vertical-align: top;
    }

    span span {
      opacity: 0;
      transform: translateY(100%);
    }
  }
`;

Wrapper.defaultProps = {
  variants: {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
    exit: {},
  },
  transition: {
    delay: 0.3,
    staggerChildren: 0.2,
  },
};
