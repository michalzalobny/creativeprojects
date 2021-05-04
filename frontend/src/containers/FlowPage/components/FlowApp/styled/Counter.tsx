import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const Counter = styled(motion.div)<Props>`
  font-size: 50px;
  font-weight: bold;
  pointer-events: none;
  color: white;
`;
