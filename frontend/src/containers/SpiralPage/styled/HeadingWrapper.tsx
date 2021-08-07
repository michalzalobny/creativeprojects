import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const HeadingWrapper = styled(motion.div)<Props>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  width: 100%;
  user-select: none;
  pointer-events: none;
  max-width: 800px;
  display: flex;
  flex-direction: column;
`;

HeadingWrapper.defaultProps = {
  variants: {
    initial: {},
    animate: {},
  },
  initial: 'initial',
};
