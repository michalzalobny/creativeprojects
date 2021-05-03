import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {
  posX: number;
  posY: number;
}

export const Wrapper = styled(motion.div)<Props>`
  transform: rotate(-45deg);
  top: ${props => props.posY}px;
  left: ${props => props.posX}px;
  position: absolute;
  transform-origin: right;
`;
