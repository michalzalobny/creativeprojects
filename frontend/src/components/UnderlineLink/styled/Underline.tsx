import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const Underline = styled(motion.div)<Props>`
  position: absolute;
  z-index: 2;
  top: 100%;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: white;
`;
