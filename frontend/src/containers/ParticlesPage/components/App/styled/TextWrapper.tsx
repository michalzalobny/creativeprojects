import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const TextWrapper = styled(motion.div)<Props>`
  position: absolute;
  z-index: 1;
  top: 70%;
  left: 10%;
  transform: translateY(-50%);
  display: inline-block;
  width: 100vw;
`;
