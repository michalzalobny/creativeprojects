import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const ContentWrapper = styled(motion.div)<Props>`
  padding: 2vw 5vw;
  background: #ff8888;
  position: relative;
  overflow: hidden;
`;

ContentWrapper.defaultProps = {
  variants: {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.08,
      },
    },
    exit: {},
  },
  initial: 'initial',
};
