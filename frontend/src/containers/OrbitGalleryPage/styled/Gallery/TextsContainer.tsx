import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const TextsContainer = styled(motion.div)<Props>`
  display: flex;
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-90deg) translateX(10px);
`;
