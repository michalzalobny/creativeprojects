import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const NightWrapper = styled(motion.div)<Props>`
  background: #20184e;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
`;

NightWrapper.defaultProps = {
  variants: {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
  },
  initial: 'initial',

  transition: {
    type: 'tween',
    duration: 1.5,
  },
};
