import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const Circle = styled(motion.div)<Props>`
  width: 50px;
  height: 50px;
  background-color: transparent;
  border: 2px solid black;
  border-radius: 50%;
  z-index: 200;
  pointer-events: none;
`;
