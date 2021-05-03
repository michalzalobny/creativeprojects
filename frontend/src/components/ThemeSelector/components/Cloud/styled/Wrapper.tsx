import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const Wrapper = styled(motion.div)<Props>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

Wrapper.defaultProps = {
  variants: {
    initial: {
      x: '-100%',
    },
    animate: {
      x: 0,
    },
  },
  transition: {
    type: 'spring',
    stiffness: 200,
    mass: 10,
    damping: 50,
  },
};
