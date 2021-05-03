import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const StarsWrapper = styled(motion.div)<Props>`
  width: 100%;
  height: 100%;
`;

StarsWrapper.defaultProps = {
  variants: {
    initial: {},
    animate: {},
    exit: {},
  },

  transition: {
    staggerChildren: 0.02,
  },
};
