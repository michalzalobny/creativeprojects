import styled from 'styled-components';
import { motion } from 'framer-motion';

interface Props {}

export const CanvasWrapper = styled(motion.div)<Props>`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
`;
