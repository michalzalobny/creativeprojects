import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {
  size: number;
}

export const Glow = styled(motion.div)<Props>`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  z-index: 1;
  box-shadow: 0 0 15px white;
  border-radius: 50%;
`;

Glow.defaultProps = {
  transition: {
    type: 'spring',
    stiffness: 250,
    mass: 4,
    damping: 50,
  },
};
