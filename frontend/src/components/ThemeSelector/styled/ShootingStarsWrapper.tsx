import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const ShootingStarsWrapper = styled(motion.div)<Props>`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
`;

ShootingStarsWrapper.defaultProps = {
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
    duration: 0.2,
  },
};
