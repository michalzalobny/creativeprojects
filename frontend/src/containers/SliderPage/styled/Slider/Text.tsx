import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const Text = styled(motion.div)<Props>`
  position: absolute;
  bottom: 3vh;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  letter-spacing: 4px;
  white-space: nowrap;
  color: black;
`;
