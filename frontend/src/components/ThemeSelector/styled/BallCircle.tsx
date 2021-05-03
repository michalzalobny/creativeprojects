import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {
  size: number;
  posX: number;
  posY: number;
}

export const BallCircle = styled(motion.div)<Props>`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background-color: #d6d6d6;
  top: ${props => props.posY}px;
  left: ${props => props.posX}px;
  border-radius: 50%;
`;
