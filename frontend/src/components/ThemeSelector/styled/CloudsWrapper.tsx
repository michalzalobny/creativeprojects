import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const CloudsWrapper = styled(motion.div)<Props>`
  width: 100%;
  height: 100%;
  position: relative;
`;

CloudsWrapper.defaultProps = {
  variants: {
    initial: {
      transition: {
        staggerChildren: 0,
      },
    },
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
    exit: {},
  },
  initial: 'initial',
  exit: 'exit',
};
